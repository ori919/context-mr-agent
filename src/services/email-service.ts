interface ResetEmailPayload {
  to: string;
  token: string;
  expiresAt: Date;
}

export class EmailService {
  private readonly fromAddress = "noreply@example.com";
  private readonly resetBaseUrl = process.env.RESET_URL || "https://app.example.com/reset";

  async sendPasswordReset(payload: ResetEmailPayload): Promise<void> {
    const resetLink = `${this.resetBaseUrl}?token=${payload.token}`;
    const expiresInHours = Math.round(
      (payload.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60)
    );

    const html = `
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password. This link expires in ${expiresInHours} hours.</p>
      <a href="${resetLink}">Reset Password</a>
      <p>If you didn't request this, you can safely ignore this email.</p>
    `;

    await this.send({
      from: this.fromAddress,
      to: payload.to,
      subject: "Password Reset Request",
      html,
    });
  }

  private async send(_options: { from: string; to: string; subject: string; html: string }): Promise<void> {
    // Placeholder for actual email provider integration
  }
}
