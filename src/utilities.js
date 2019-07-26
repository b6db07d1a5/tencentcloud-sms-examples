import crypto from 'crypto'

export function sig({ appkey, random, time, mobile }) {
  const strSig = `appkey=${appkey}&random=${random}&time=${time}&mobile=${mobile}`

  return crypto
    .createHash('sha256')
    .update(strSig)
    .digest('hex')
}

export function random() {
  return Math.floor(Math.random() * 100)
}
