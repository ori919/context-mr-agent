import { Request, Response, Router } from "express";
import { TokenService } from "../../services/token-service";
import { EmailService } from "../../services/email-service";
import { RateLimiter } from "../../services/rate-limiter";

const router = Router();
const tokenService = new TokenService();
const emailService = new EmailService();
const rateLimiter = new RateLimiter({ windowMs: 15 * 60 * 1000, max: 5 });

router.post("/api/v1/auth/reset-password/request", rateLimiter.check(), async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email is required" });
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(200).json({ message: "If the email exists, a reset link has been sent." });
  }

  const token = await tokenService.createRecoveryToken(user.id, {
    expiresIn: 7200,
    singleUse: true,
  });

  await emailService.sendPasswordReset({
    to: user.email,
    token: token.value,
    expiresAt: token.expiresAt,
  });

  return res.status(200).json({ message: "If the email exists, a reset link has been sent." });
});

router.post("/api/v1/auth/reset-password/confirm", async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: "Token and new password are required" });
  }

  const recovery = await tokenService.validateRecoveryToken(token);
  if (!recovery) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  await updateUserPassword(recovery.userId, newPassword);
  await tokenService.invalidateRecoveryToken(token);
  await invalidateAllSessions(recovery.userId);

  return res.status(200).json({ message: "Password updated successfully" });
});

async function findUserByEmail(_email: string) {
  return { id: "user-1", email: _email };
}

async function updateUserPassword(_userId: string, _newPassword: string) {
  return true;
}

async function invalidateAllSessions(_userId: string) {
  return true;
}

export default router;
