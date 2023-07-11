/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/*
export function someAction (context) {
}
*/
import { api } from 'boot/axios';
import jwt_decode from 'jwt-decode';

export const login = async ({ commit, dispatch }, payload) => {
  await api.post('login', payload).then((response) => {
    const token = {
      access: response.data.accessToken,
      refresh: response.data.refreshToken,
    };
    commit('setToken', token);
    api.defaults.headers.common.Authorization = 'Bearer ' + token.access;
    //commit('setUser', response.data.user);
    dispatch('getUser', token);
  });
};

export const logout = ({ commit }) => {
  api.defaults.headers.common.Authorization = '';
  commit('removeToken');
};

export const getUser = async ({ commit }, token) => {
  console.log(token);
  const userData = jwt_decode(token.access);
  console.log(userData);
  await api
    .get(`profile/?userId=${String(userData.userId)}`)
    .then((response) => {
      console.log(response.data);
      commit('setUser', response.data);
    });
};

export const init = async ({ commit, dispatch }) => {
  const token = {
    access: localStorage.getItem('token'),
    refresh: localStorage.getItem('refreshToken'),
  };
  if (token.access) {
    await commit('setToken', token);
    api.defaults.headers.common.Authorization = 'Bearer ' + token.access;
    dispatch('getUser', token);
  } else {
    commit('removeToken');
  }
};
