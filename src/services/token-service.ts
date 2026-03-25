import crypto from "crypto";

interface TokenOptions {
  expiresIn: number;
  singleUse: boolean;
}

interface RecoveryToken {
  value: string;
  userId: string;
  expiresAt: Date;
  used: boolean;
}

const TOKEN_EXPIRY = 7200;

export class TokenService {
  private tokens: Map<string, RecoveryToken> = new Map();

  async createRecoveryToken(userId: string, options: TokenOptions): Promise<RecoveryToken> {
    const value = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + (options.expiresIn || TOKEN_EXPIRY) * 1000);

    const token: RecoveryToken = {
      value,
      userId,
      expiresAt,
      used: false,
    };

    this.tokens.set(value, token);
    return token;
  }

  async validateRecoveryToken(tokenValue: string): Promise<RecoveryToken | null> {
    const token = this.tokens.get(tokenValue);

    if (!token) return null;
    if (token.used) return null;
    if (token.expiresAt < new Date()) return null;

    return token;
  }

  async invalidateRecoveryToken(tokenValue: string): Promise<void> {
    const token = this.tokens.get(tokenValue);
    if (token) {
      token.used = true;
    }
  }
}
