/* eslint-disable react/prop-types */
import { useState } from "react";
import { API_URL } from "../lib/api";

const initialForm = {
  name: "",
  email: "",
  password: "",
  setupKey: "",
};

export default function Login({ onAuthenticated }) {
  const [mode, setMode] = useState("user-login");
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const admin = mode.startsWith("admin");
  const signup = mode === "user-register" || mode === "admin-register";

  const changeMode = (next) => {
    setMode(next);
    setMessage("");
    setForm(initialForm);
  };

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    // ✅ Correct backend endpoints
    const endpoint =
      mode === "user-register"
        ? "/api/auth/register"
        : mode === "admin-register"
          ? "/api/auth/bootstrap-admin"
          : "/api/auth/login";

    const body = signup
      ? form
      : {
          email: form.email,
          password: form.password,
          role: admin ? "admin" : "user",
        };

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to sign in");
      }

      const session = {
        token: data.token,
        account: data.account,
      };

      localStorage.setItem("shikshasetu_session", JSON.stringify(session));

      onAuthenticated(session);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-canvas text-ink grid lg:grid-cols-2">
      <section className="hidden lg:flex flex-col justify-between bg-ink text-canvas p-12 xl:p-16">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sage-500 grid place-items-center font-serif text-xl">
            S
          </div>
          <span className="font-serif text-2xl">ShikshaSetu</span>
        </div>

        <div>
          <p className="eyebrow text-sage-200">Student Growth Engine</p>
          <h1 className="font-serif text-5xl leading-tight tracking-tightest mt-5 max-w-md">
            A clearer bridge between insight and action.
          </h1>
          <p className="text-canvas/65 mt-6 max-w-sm leading-7">
            Secure access for administrators and members of your academic
            community.
          </p>
        </div>

        <p className="text-xs text-canvas/40">
          Your account determines what you can access.
        </p>
      </section>

      <section className="flex items-center justify-center p-5 sm:p-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-7 h-7 rounded-md bg-sage-500 text-white grid place-items-center font-serif">
              S
            </div>
            <span className="font-serif text-xl">ShikshaSetu</span>
          </div>

          <p className="eyebrow">
            {admin ? "Administrator portal" : "Member portal"}
          </p>

          <h2 className="font-serif text-3xl tracking-tightest mt-2">
            {signup ? "Create your account" : "Welcome back"}
          </h2>

          <p className="text-sm text-ink-muted mt-2">
            {admin
              ? "Administrators have full workspace permissions."
              : "Sign in to view your learning workspace."}
          </p>

          <div className="grid grid-cols-2 gap-1 rounded-xl bg-chalk p-1 mt-7">
            <button
              type="button"
              onClick={() => changeMode("user-login")}
              className={`rounded-lg py-2 text-sm font-medium ${
                !admin ? "bg-white shadow-sm text-ink" : "text-ink-muted"
              }`}
            >
              User
            </button>

            <button
              type="button"
              onClick={() => changeMode("admin-login")}
              className={`rounded-lg py-2 text-sm font-medium ${
                admin ? "bg-white shadow-sm text-ink" : "text-ink-muted"
              }`}
            >
              Admin
            </button>
          </div>

          <form className="mt-6 space-y-4" onSubmit={submit}>
            {signup && (
              <label className="block text-sm font-medium">
                Full name
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-clean w-full mt-1.5"
                  placeholder="Your name"
                />
              </label>
            )}

            <label className="block text-sm font-medium">
              Email address
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-clean w-full mt-1.5"
                placeholder="you@school.edu"
              />
            </label>

            <label className="block text-sm font-medium">
              Password
              <input
                required
                minLength="8"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input-clean w-full mt-1.5"
                placeholder="At least 8 characters"
              />
            </label>

            {mode === "admin-register" && (
              <label className="block text-sm font-medium">
                Setup key
                <span className="font-normal text-ink-muted">
                  {" "}
                  (needed after first admin)
                </span>
                <input
                  type="password"
                  value={form.setupKey}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      setupKey: e.target.value,
                    })
                  }
                  className="input-clean w-full mt-1.5"
                  placeholder="Optional for first admin"
                />
              </label>
            )}

            {message && (
              <p
                role="alert"
                className="rounded-lg bg-terra-50 text-terra-600 px-3 py-2 text-sm"
              >
                {message}
              </p>
            )}

            <button
              disabled={loading}
              className="btn-primary w-full py-2.5 disabled:opacity-60"
            >
              {loading ? "Please wait…" : signup ? "Create account" : "Sign in"}
            </button>
          </form>

          <div className="text-center text-sm text-ink-muted mt-5">
            {signup ? (
              <button
                className="text-sage-700 font-medium"
                onClick={() => changeMode(admin ? "admin-login" : "user-login")}
              >
                Already have an account? Sign in
              </button>
            ) : (
              <button
                className="text-sage-700 font-medium"
                onClick={() =>
                  changeMode(admin ? "admin-register" : "user-register")
                }
              >
                {admin
                  ? "Create an administrator account"
                  : "New here? Create a user account"}
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
