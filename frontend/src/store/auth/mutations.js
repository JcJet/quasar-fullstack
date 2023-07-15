export const setToken = (state, token) => {
  //state.token = token;
  state.isAuthenticated = true;
  window.localStorage.setItem('token', String(token.access));
  window.localStorage.setItem('refreshToken', String(token.refresh));
};

export const removeToken = (state) => {
  //state.token = '';
  state.isAuthenticated = false;
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('refreshToken');
};

export const setUser = (state, user) => {
  state.user = user;
};
