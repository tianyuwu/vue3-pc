export function warn(message: string) {
  console.warn(`[warn]:${message}`)
}

export function error(message: string) {
  throw new Error(`[error]:${message}`)
}
