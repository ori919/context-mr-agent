-- Migration: Add recovery tokens table for password reset flow
-- This migration is NOT reversible. Rolling back will drop token history.

CREATE TABLE IF NOT EXISTS recovery_tokens (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash  VARCHAR(128) NOT NULL UNIQUE,
  expires_at  TIMESTAMP WITH TIME ZONE NOT NULL,
  used        BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address  INET,
  user_agent  TEXT
);

CREATE INDEX idx_recovery_tokens_user_id ON recovery_tokens(user_id);
CREATE INDEX idx_recovery_tokens_expires_at ON recovery_tokens(expires_at) WHERE used = FALSE;

-- Rate limit tracking per IP for reset requests
CREATE TABLE IF NOT EXISTS reset_rate_limits (
  ip_address  INET PRIMARY KEY,
  count       INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
