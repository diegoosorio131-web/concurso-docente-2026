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

  function shouldRememberLogin() {
    return localStorage.getItem(rememberPreferenceKey) !== "false";
  }

  function restoreLoginPreference() {
    const remember = shouldRememberLogin();
    rememberLoginInput.checked = remember;
    emailInput.value = remember ? localStorage.getItem(rememberedEmailKey) || "" : "";
    form.autocomplete = remember ? "on" : "off";
  }

  function saveLoginPreference(email) {
    const remember = rememberLoginInput.checked;
    localStorage.setItem(rememberPreferenceKey, String(remember));
    form.autocomplete = remember ? "on" : "off";
    if (remember) localStorage.setItem(rememberedEmailKey, email);
    else localStorage.removeItem(rememberedEmailKey);
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

        if (signInData.user && await verifyApproval(client, signInData.user)) {
          await saveBrowserCredential(email, password);
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
