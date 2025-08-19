'use server'
import { SignJWT, jwtVerify, type JWTPayload } from 'jose'
import { v4 as uuidv4 } from 'uuid'

// Use a random string if no JWT key is defined in environment
const JWT_SECRET =
  process.env.JWT_SECRET || 'dev_secret_change_me_in_production_9d72ba'
const secret = new TextEncoder().encode(JWT_SECRET)
const ISSUER = 'relatosdebarrios-hub-api'
const AUDIENCE = 'relatosdebarrios-client'

export interface UploadProofPayload extends JWTPayload {
  ipHash: string // Hashed client IP
  timestamp: number // When the proof was issued
  nonce: string // Unique request identifier
  correlationId?: string // Optional trace ID
}

/**
 * Creates a correlation ID that can be used to track requests across services.
 * If an existing ID is provided, it will be validated and returned if valid.
 *
 * @param existingId - An optional existing correlation ID to validate
 * @returns A valid correlation ID
 */
export async function createCorrelationId(
  existingId?: string
): Promise<string> {
  if (
    existingId &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      existingId
    )
  ) {
    return existingId
  }
  return uuidv4()
}

/**
 * Creates a signed upload proof token for use in cookie authentication between
 * validate-ip and blob-upload endpoints.
 *
 * @param payload - The data to include in the JWT
 * @returns A signed JWT
 */
export async function createUploadProof(
  payload: UploadProofPayload
): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime('5m') // Short lived token valid for 5 minutes
    .sign(secret)
}

/**
 * Verifies and decodes an upload proof token.
 *
 * @param token - The JWT to verify
 * @returns The decoded payload if valid, or null if invalid
 */
export async function verifyUploadProof(
  token: string
): Promise<UploadProofPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret, {
      issuer: ISSUER,
      audience: AUDIENCE,
    })

    return payload as UploadProofPayload
  } catch (error) {
    console.error('JWT verification error:', error)
    return null
  }
}
