import { createStore } from 'vuex';
import firebase from '../firebase';

import photo from './modules/photo';
import team from './modules/team';

const userDB = firebase
  .firestore()
  .collection('team')
  .doc('EMc90NY0ls3VdAdtsRAa');

// const teamData = {
//   couch: {
//     id: 'couch',
//     name: 'Владимир Ширяев',
//     photoSettings: {
//       left: -20,
//       src: 'https://firebasestorage.googleapis.com/v0/b/football-80212.appspot.com/o/1%2Fimage?alt=media&token=4bd05108-0533-4cd5-ad92-1011f7795ce0',
//       top: 20,
//       width: 130,
//     },
//   },
//   logo: {
//     id: 'logo',
//     name: 'Металлург',
//     city: 'Выкса',
//     photoSettings: {
//       left: -20,
//       src: 'https://firebasestorage.googleapis.com/v0/b/football-80212.appspot.com/o/logo.JPG?alt=media&token=e7387a87-9c85-4f04-9940-d65d86f85d70',
//       top: 0,
//       width: 100,
//     },
//   },
//   bg: {
//     photoSettings: {
//       left: 10,
//       src: 'https://firebasestorage.googleapis.com/v0/b/football-80212.appspot.com/o/%D0%BA%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%D0%B0_%D1%84%D0%BE%D0%BD.jpg?alt=media&token=6ef96e5d-b771-45d4-8d1e-c53d7478e8a5',
//       top: 10,
//       width: 100,
//     },
//   },
//   team: [
//     {
//       id: 1,
//       position: 1,
//       name: 'Дэвид Бэкхэм 1',
//       number: 1,
//       photoSettings: {
//         left: 10,
//         src: 'https://firebasestorage.googleapis.com/v0/b/football-80212.appspot.com/o/%D0%B1%D1%8D%D0%BA%D1%85%D1%8D%D0%BC.jpg?alt=media&token=585c19cf-29bb-43e4-b655-95100ec08618',
//         top: 10,
//         width: 100,
//       },
//     },
//     {
//       id: 2,
//       position: 2,
//       name: 'Дэвид Бэкхэм 2',
//       number: 2,
//       photoSettings: {
//         left: 20,
//         src: 'https://firebasestorage.googleapis.com/v0/b/football-80212.appspot.com/o/%D0%B1%D1%8D%D0%BA%D1%85%D1%8D%D0%BC2.jpeg?alt=media&token=6ed7d109-a52c-4410-99d2-8f74534c7fc8',
//         top: 20,
//         width: 120,
//       },
//     },
//     {
//       id: 3,
//       position: 3,
//       name: 'Дэвид Бэкхэм 3',
//       number: 3,
//       photoSettings: {
//         left: 10,
//         src: 'https://firebasestorage.googleapis.com/v0/b/football-80212.appspot.com/o/%D0%B1%D1%8D%D0%BA%D1%85%D1%8D%D0%BC.jpg?alt=media&token=585c19cf-29bb-43e4-b655-95100ec08618',
//         top: 10,
//         width: 100,
//       },
//     },
//     {
//       id: 4,
//       position: 4,
//       name: 'Дэвид Бэкхэм 4',
//       number: 4,
//       photoSettings: {
//         left: 20,
//         src: 'https://firebasestorage.googleapis.com/v0/b/football-80212.appspot.com/o/%D0%B1%D1%8D%D0%BA%D1%85%D1%8D%D0%BC2.jpeg?alt=media&token=6ed7d109-a52c-4410-99d2-8f74534c7fc8',
//         top: 20,
//         width: 120,
//       },
//     },
//     {
//       id: 5,
//       position: 5,
//       name: 'Дэвид Бэкхэм 5',
//       number: 5,
//       photoSettings: {
//         left: 10,
//         src: 'https://firebasestorage.googleapis.com/v0/b/football-80212.appspot.com/o/%D0%B1%D1%8D%D0%BA%D1%85%D1%8D%D0%BC.jpg?alt=media&token=585c19cf-29bb-43e4-b655-95100ec08618',
//         top: 10,
//         width: 100,
//       },
//     },
//   ],
// };

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
      //* Сохранение данных на сервер
      return userDB.set(payload.data, { merge: true });
    },
  },
  mutations: {
    addUserInfo(state, data) {
      state.userInfo = data;
    },
    setStorageID(state, data) {
      state.storageID = data;
    },
    changeUserInfo(state, payload) {
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
