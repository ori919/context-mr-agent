export const authConfig = {
  passwordReset: {
    tokenExpirySeconds: 7200,
    maxAttemptsPerWindow: 5,
    rateLimitWindowMs: 15 * 60 * 1000,
    singleUseTokens: true,
    invalidateSessionsOnReset: true,
  },

  session: {
    maxAge: 86400,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  },

  email: {
    resetBaseUrl: process.env.RESET_URL || "https://app.example.com/reset",
    fromAddress: "noreply@example.com",
  },
};
