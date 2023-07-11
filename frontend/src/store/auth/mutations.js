export const setToken = (state, token) => {
  //state.token = token;
  state.isAuthenticated = true;
  window.localStorage.setItem('token', String(token.access)); //TODO: which token?
  window.localStorage.setItem('refreshToken', String(token.refresh));
};

export const removeToken = (state, token) => {
  //state.token = '';
  state.isAuthenticated = false;
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('refreshToken');
};

export const setUser = (state, user) => {
  state.user = user;
};
