import firebase from './../../firebase';
export type { TeamInfo } from './../types/teamInfo.ts';

export default {
  namespaced: false,
  state() {
    return {
      team: {},
    };
  },
  getters: {
    getTeamInfoStore(state) {
      return state.team;
    },
  },
  mutations: {
    setTeamInfo(state, data) {
      state.team = data;
    },
  },
  actions: {
    getTeamInfo() {
      const userDB = firebase
        .firestore()
        .collection('team')
        .doc('EMc90NY0ls3VdAdtsRAa');

      return userDB.get().then((doc) => {
        return doc.data();
      });
    },
  },
};
