export default {
  namespaced: false,
  state() {
    return {
      defaultImg: {
        photo:
          'https://firebasestorage.googleapis.com/v0/b/football-80212.appspot.com/o/defaultPhoto.jpg?alt=media&token=4b464124-bf12-4239-94f7-32fdfafbee07',
        bg: 'https://firebasestorage.googleapis.com/v0/b/football-80212.appspot.com/o/defaultPhoto.jpg?alt=media&token=4b464124-bf12-4239-94f7-32fdfafbee07',
      },
    };
  },
  getters: {
    getDefaultImg(state) {
      return state.defaultImg;
    },
  },
  mutations: {},
  actions: {},
};
