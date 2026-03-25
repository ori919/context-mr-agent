interface RateLimiterOptions {
  windowMs: number;
  max: number;
}

interface RequestEntry {
  count: number;
  resetAt: number;
}

export class RateLimiter {
  private options: RateLimiterOptions;
  private store: Map<string, RequestEntry> = new Map();

  constructor(options: RateLimiterOptions) {
    this.options = options;
  }

  check() {
    return (req: any, res: any, next: any) => {
      const key = req.ip || req.connection?.remoteAddress || "unknown";
      const now = Date.now();
      const entry = this.store.get(key);

      if (!entry || now > entry.resetAt) {
        this.store.set(key, { count: 1, resetAt: now + this.options.windowMs });
        return next();
      }

      if (entry.count >= this.options.max) {
        return res.status(429).json({
          error: "Too many requests. Please try again later.",
          retryAfter: Math.ceil((entry.resetAt - now) / 1000),
        });
      }

      entry.count++;
      return next();
    };
  }
}
