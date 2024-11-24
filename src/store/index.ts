import { createStore } from 'vuex';
import firebase from '../firebase';

import photo from './modules/photo';
import team from './modules/team';

const userDB = firebase
  .firestore()
  .collection('team')
  .doc('EMc90NY0ls3VdAdtsRAa');

export default createStore({
  modules: {
    photo,
    team,
  },
  state() {
    return {
      userInfo: null,
      storageID: null,
    };
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo;
    },
    getStorageID(state) {
      return state.storageID;
    },
  },
  actions: {
    changeTeamInfo(state, payload) {
      console.log('🚀 ~ changeTeamInfo ~ payload:', payload, state);
      //* Сохранение данных на сервер
      return userDB.set({ data: payload }, { merge: true });
    },
  },
  mutations: {
    addUserInfo(state, data) {
      state.userInfo = data;
    },
    setStorageID(state, data) {
      state.storageID = data;
    },
    changeUserInfo(payload) {
      console.log('🚀 ~ changeUserInfo ~ payload:', payload);
      //* Сохранение данных на сервер
      // state.userInfo[payload.type] = payload.data;
      userDB.set({ couch: payload.data }, { merge: true });
    },
    addPublic(state, payload) {
      state.userInfo.publics.push(payload);
      firebase
        .firestore()
        .collection('users')
        .doc(state.storageID)
        .set({ publics: state.userInfo.publics }, { merge: true });
    },
    deletePublic(state, publicID) {
      state.userInfo.publics = state.userInfo.publics.filter(
        (post) => post.id !== publicID
      );
      firebase
        .firestore()
        .collection('users')
        .doc(state.storageID)
        .set({ publics: state.userInfo.publics }, { merge: true });
    },
  },
});
