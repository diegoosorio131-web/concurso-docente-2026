(() => {
  const config = window.AULA_CONFIG || {};
  const gate = document.getElementById("authGate");
  const app = document.querySelector(".app-shell");
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");
  const rememberLoginInput = document.getElementById("rememberLogin");
  const togglePasswordBtn = document.getElementById("togglePasswordBtn");
  const message = document.getElementById("authMessage");
  const loginBtn = document.getElementById("loginBtn");
  const loginBtnLabel = document.getElementById("loginBtnLabel");
  const loginLabel = loginBtnLabel.textContent;
  const accountSummary = document.getElementById("accountSummary");
  const accountName = document.getElementById("accountName");
  const accountEmail = document.getElementById("accountEmail");
  const logoutBtn = document.getElementById("logoutBtn");
  const rememberPreferenceKey = "aula2026RememberLogin";
  const rememberedEmailKey = "aula2026RememberedEmail";
  const rememberedCredentialKey = "aula2026RememberedCredential";
  const credentialDatabaseName = "aula2026Auth";
  const credentialStoreName = "secureKeys";
  const credentialKeyId = "loginCredentialKey";

  function shouldRememberLogin() {
    return localStorage.getItem(rememberPreferenceKey) !== "false";
  }

  function restoreLoginPreference() {
    const remember = shouldRememberLogin();
    rememberLoginInput.checked = remember;
    emailInput.value = remember ? localStorage.getItem(rememberedEmailKey) || "" : "";
    form.autocomplete = remember ? "on" : "off";
    if (remember) void restoreEncryptedCredential();
  }

  function saveLoginPreference(email) {
    const remember = rememberLoginInput.checked;
    localStorage.setItem(rememberPreferenceKey, String(remember));
    form.autocomplete = remember ? "on" : "off";
    if (remember) localStorage.setItem(rememberedEmailKey, email);
    else {
      localStorage.removeItem(rememberedEmailKey);
      localStorage.removeItem(rememberedCredentialKey);
    }
  }

  function openCredentialDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(credentialDatabaseName, 1);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains(credentialStoreName)) {
          request.result.createObjectStore(credentialStoreName);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  function readCredentialKey(database) {
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(credentialStoreName, "readonly");
      const request = transaction.objectStore(credentialStoreName).get(credentialKeyId);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  function writeCredentialKey(database, key) {
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(credentialStoreName, "readwrite");
      transaction.objectStore(credentialStoreName).put(key, credentialKeyId);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
  }

  async function getIndexedDatabaseCredentialKey() {
    const database = await openCredentialDatabase();
    try {
      let key = await readCredentialKey(database);
      if (!key) {
        key = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
        await writeCredentialKey(database, key);
      }
      return key;
    } finally {
      database.close();
    }
  }

  async function getDerivedCredentialKey() {
    const source = new TextEncoder().encode(
      `${config.supabaseUrl}|${config.supabasePublishableKey}|aula2026-local-credentials`
    );
    const digest = await crypto.subtle.digest("SHA-256", source);
    return crypto.subtle.importKey("raw", digest, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
  }

  async function resolveCredentialEncryptionKey(preferredMode = "") {
    if (preferredMode === "derived") {
      return { key: await getDerivedCredentialKey(), mode: "derived" };
    }
    if (window.indexedDB) {
      try {
        return { key: await getIndexedDatabaseCredentialKey(), mode: "indexeddb" };
      } catch {
        // Some privacy modes expose IndexedDB but block its use.
      }
    }
    return { key: await getDerivedCredentialKey(), mode: "derived" };
  }

  function bytesToBase64(bytes) {
    let binary = "";
    bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
    return btoa(binary);
  }

  function base64ToBytes(value) {
    return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
  }

  async function saveEncryptedCredential(email, password) {
    if (!rememberLoginInput.checked || !window.crypto?.subtle) return;
    try {
      const { key, mode } = await resolveCredentialEncryptionKey();
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const content = new TextEncoder().encode(JSON.stringify({ email, password }));
      const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, content);
      localStorage.setItem(rememberedCredentialKey, JSON.stringify({
        mode,
        iv: bytesToBase64(iv),
        data: bytesToBase64(new Uint8Array(encrypted))
      }));
    } catch {
      // The browser password manager remains available as a fallback.
    }
  }

  async function restoreEncryptedCredential() {
    const saved = localStorage.getItem(rememberedCredentialKey);
    if (!saved || !window.crypto?.subtle) return;
    try {
      const payload = JSON.parse(saved);
      const { key } = await resolveCredentialEncryptionKey(payload.mode || "indexeddb");
      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: base64ToBytes(payload.iv) },
        key,
        base64ToBytes(payload.data)
      );
      const credential = JSON.parse(new TextDecoder().decode(decrypted));
      if (credential.email && credential.password && rememberLoginInput.checked) {
        emailInput.value = credential.email;
        passwordInput.value = credential.password;
      }
    } catch {
      localStorage.removeItem(rememberedCredentialKey);
    }
  }

  function clearLegacySession() {
    try {
      const projectRef = new URL(config.supabaseUrl).hostname.split(".")[0];
      const legacySessionKey = `sb-${projectRef}-auth-token`;
      localStorage.removeItem(legacySessionKey);
      sessionStorage.removeItem(legacySessionKey);
    } catch {
      // Invalid configuration is handled when the Supabase client is created.
    }
  }

  async function saveBrowserCredential(email, password) {
    if (!rememberLoginInput.checked || !window.PasswordCredential || !navigator.credentials?.store) return;
    try {
      await navigator.credentials.store(new PasswordCredential({
        id: email,
        name: email,
        password
      }));
    } catch {
      // The browser can still offer its native password-saving prompt.
    }
  }

  function setAuthenticated(user) {
    window.AULA_USER_ID = user.id;
    gate.hidden = true;
    app.hidden = false;
    accountSummary.hidden = false;
    accountEmail.textContent = user.email || "";
    accountName.textContent = user.user_metadata?.display_name || "Mi cuenta";
    document.body.classList.remove("auth-locked");
    window.dispatchEvent(new CustomEvent("aula:auth", { detail: { user } }));
  }

  function setSignedOut() {
    window.AULA_USER_ID = null;
    app.hidden = true;
    gate.hidden = false;
    accountSummary.hidden = true;
    form.reset();
    restoreLoginPreference();
    message.textContent = "";
    document.body.classList.add("auth-locked");
    window.dispatchEvent(new CustomEvent("aula:auth", { detail: { user: null } }));
    window.setTimeout(() => emailInput.focus(), 0);
  }

  function setMessage(text, type = "") {
    message.textContent = text;
    message.dataset.type = type;
  }

  async function verifyApproval(client, user) {
    const { data, error } = await client
      .from("approved_users")
      .select("active")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error || !data?.active) {
      setSignedOut();
      setMessage("Esta cuenta todavia no ha sido aprobada por el administrador.", "error");
      window.setTimeout(() => client.auth.signOut(), 0);
      return false;
    }

    setAuthenticated(user);
    return true;
  }

  if (!config.authEnabled) {
    gate.hidden = true;
    app.hidden = false;
    window.AULA_AUTH_READY = Promise.resolve(null);
    return;
  }

  app.hidden = true;
  gate.hidden = false;
  document.body.classList.add("auth-locked");
  restoreLoginPreference();
  clearLegacySession();

  window.AULA_AUTH_READY = import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm")
    .then(async ({ createClient }) => {
      if (!config.supabaseUrl || !config.supabasePublishableKey) {
        throw new Error("La autenticacion todavia no esta configurada.");
      }

      const client = createClient(config.supabaseUrl, config.supabasePublishableKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: true,
          detectSessionInUrl: false
        }
      });
      window.AULA_SUPABASE = client;

      const { data, error } = await client.auth.getSession();
      if (error) throw error;
      if (data.session?.user) await verifyApproval(client, data.session.user);
      else setSignedOut();

      client.auth.onAuthStateChange((_event, session) => {
        window.setTimeout(() => {
          if (session?.user) void verifyApproval(client, session.user);
          else setSignedOut();
        }, 0);
      });

      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        loginBtn.disabled = true;
        loginBtnLabel.textContent = "Verificando...";
        setMessage("");
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        saveLoginPreference(email);

        const { data: signInData, error: signInError } = await client.auth.signInWithPassword({
          email,
          password
        });

        if (signInError) {
          setMessage("Correo o contrasena incorrectos, o cuenta sin autorizacion.", "error");
          loginBtn.disabled = false;
          loginBtnLabel.textContent = loginLabel;
          return;
        }

        if (signInData.user) {
          await saveEncryptedCredential(email, password);
          if (await verifyApproval(client, signInData.user)) {
            await saveBrowserCredential(email, password);
          }
        }
        loginBtn.disabled = false;
        loginBtnLabel.textContent = loginLabel;
      });

      logoutBtn.addEventListener("click", () => client.auth.signOut());
      return client;
    })
    .catch((error) => {
      setSignedOut();
      setMessage(error.message || "No fue posible iniciar el acceso seguro.", "error");
      loginBtn.disabled = true;
      throw error;
    });

  togglePasswordBtn.addEventListener("click", () => {
    const visible = passwordInput.type === "text";
    passwordInput.type = visible ? "password" : "text";
    togglePasswordBtn.setAttribute("aria-label", visible ? "Mostrar contrasena" : "Ocultar contrasena");
  });
})();
