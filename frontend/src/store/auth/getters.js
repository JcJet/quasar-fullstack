/* eslint-disable @typescript-eslint/no-unsafe-return */
export function getUser(state) {
  return state.user;
}

export function getToken(state) {
  return state.token;
}
export function isAuthenticated(state) {
  return state.isAuthenticated;
}
