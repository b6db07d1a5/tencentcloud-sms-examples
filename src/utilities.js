import crypto from 'crypto'

export function sig({ appKey, random, time, mobile }) {
  if (Array.isArray(mobile)) {
    mobile = mobile.join(',')
  }

  const strSig = `appkey=${appKey}&random=${random}&time=${time}&mobile=${mobile}`

  return crypto
    .createHash('sha256')
    .update(strSig)
    .digest('hex')
}

export function random() {
  return Math.floor(Math.random() * 100)
}

export function unix() {
  return Math.floor(new Date() / 1000)
}
