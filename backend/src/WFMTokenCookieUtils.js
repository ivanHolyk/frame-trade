import { decodeJwt } from 'jose'

/**
 *
 * @param {string} token
 * @returns {string} Cookie string
 */
function getCookieString(token) {
  const claims = decodeJwt(token)

  const exipireDate = new Date(claims.exp * 1000).toUTCString()

  let cookieString = `JWT=${token}; Path=/; Domain=warframe.market; Secure; HttpOnly; Expires=${exipireDate}`
  console.log(cookieString)
  /**
   * JWT=tokenHeader.tokenPayload.tokenSecurity;
   *  Path=/; Domain=warframe.market; Secure; HttpOnly; Expires=Thu, 26 Dec 2024 19:55:33 GMT;
   */
  return cookieString
}

/**
 *
 * @param {string} token
 * @param {import('express').Response} res - Express response object
 */
function setCookie(token, res) {
  const claims = decodeJwt(token)
  const expireDate = new Date(claims.exp * 1000) // Convert to milliseconds

  res.cookie('JWT', token, {
    path: '/',
    domain: 'warframe.market',
    secure: true,
    httpOnly: true,
    expires: expireDate
  })
  console.log(
    `JWT=${token}; Path=/; Domain=warframe.market; Secure; HttpOnly; Expires=${expireDate.toUTCString()}`
  )
}

export { setCookie, getCookieString }
