/**
 * Environment utility functions
 */

export const isEnv = (env: 'dev' | 'prod' | 'prev'): boolean => {
  const environments = {
    dev: 'development',
    prod: 'production',
    prev: 'preview',
  }
  return process.env.NODE_ENV === environments[env]
}
