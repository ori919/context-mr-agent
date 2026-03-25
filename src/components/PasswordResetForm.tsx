import React, { useState } from "react";

type Step = "request" | "sent" | "confirm" | "done";

export function PasswordResetForm() {
  const [step, setStep] = useState<Step>("request");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRequestReset(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/v1/auth/reset-password/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setLoading(false);
    if (res.ok) {
      setStep("sent");
    } else {
      setError("Something went wrong. Please try again.");
    }
  }

  async function handleConfirmReset(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/v1/auth/reset-password/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    setLoading(false);
    if (res.ok) {
      setStep("done");
    } else {
      const data = await res.json();
      setError(data.error || "Invalid or expired token.");
    }
  }

  if (step === "request") {
    return (
      <form onSubmit={handleRequestReset}>
        <h2>Reset your password</h2>
        <p>Enter your email to receive a reset link.</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Sending…" : "Send reset link"}
        </button>
      </form>
    );
  }

  if (step === "sent") {
    return (
      <div>
        <h2>Check your email</h2>
        <p>If an account exists for {email}, a reset link has been sent.</p>
        <button onClick={() => setStep("confirm")}>I have a token</button>
      </div>
    );
  }

  if (step === "confirm") {
    return (
      <form onSubmit={handleConfirmReset}>
        <h2>Set a new password</h2>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Reset token"
          required
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New password"
          minLength={8}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Updating…" : "Reset password"}
        </button>
      </form>
    );
  }

  return (
    <div>
      <h2>Password updated</h2>
      <p>Your password has been changed. You can now log in with your new credentials.</p>
    </div>
  );
}
