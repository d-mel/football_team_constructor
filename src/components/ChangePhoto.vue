<template>
  <div class="modal-bg flex-center">
    <div class="modal" :class="currentPosition.class">
      <div class="modal-header">
        <span>Редактировать фото</span>
        <span @click="$emit('closeModal')">Закрыть</span>
      </div>
      <div class="modal-content">
        <div class="modal-content__photo">
          <div class="modal-content__photo__bg">
            <div class="modal-content__photo__wrap" ref="availableLine">
              <img
                alt="Background"
                draggable="false"
                :src="currentPosition.src"
                :style="styleForImg"
                ref="img"
                @mousedown="availableMove"
                @mouseleave="unavailableMove"
                @mouseup="unavailableMove"
                @mousemove="changePosition"
              />
              <div v-if="loadImg" class="progress">
                <progress :value="progressLoad" max="100"></progress>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-content__tools">
          <p>Увеличить</p>
          <input
            type="range"
            min="1"
            max="3"
            step="0.1"
            v-model="zoom"
            aria-valuetext="Увеличить"
          />
        </div>
      </div>
      <div class="modal-btn">
        <button class="modal-btn__delete" @click="deleteImg">
          Удалить фото
        </button>
        <div>
          <button>
            Изменить фото
            <input type="file" accept="image/*" @change="addNewPhoto" />
          </button>
          <button @click="saveSettingsForPhoto">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '../firebase.ts';

export default {
  emits: ['save', 'closeModal'],
  props: {
    currentPosition: Object,
    id: String,
  },
  data() {
    return {
      bgPosition: {
        top: this.currentPosition.top / this.currentPosition.difference,
        left: this.currentPosition.left / this.currentPosition.difference,
        width: this.currentPosition.width / (this.currentPosition.width / 100),
      },
      zoom: this.currentPosition.width / 100,
      move: false,
      top: null,
      left: null,
      loadImg: false,
      progressLoad: 0,
    };
  },
  computed: {
    styleForImg() {
      return `top: ${this.bgPosition.top}px; left: ${
        this.bgPosition.left
      }px; width: ${this.bgPosition.width * this.zoom}%`;
    },
  },
  methods: {
    availableMove(evt) {
      this.top = evt.pageY - evt.target.offsetTop;
      this.left = evt.pageX - evt.target.offsetLeft;
      this.move = true;
    },
    unavailableMove() {
      this.top = null;
      this.left = null;
      this.move = false;
    },
    changePosition(evt) {
      if (this.move) {
        this.bgPosition.top = evt.pageY - this.top;
        this.bgPosition.left = evt.pageX - this.left;
      }
    },
    saveSettingsForPhoto() {
      const img = this.$refs.img;
      this.$emit('save', this.currentPosition.type, {
        top: img.offsetTop * this.currentPosition.difference,
        left: img.offsetLeft * this.currentPosition.difference,
        width: this.bgPosition.width * this.zoom,
        src: img.src,
      });
    },
    addNewPhoto(evt) {
      this.loadImg = true;
      const uploadTask = firebase
        .storage()
        .ref(`/${this.id}`)
        .child(this.currentPosition.type.split('Settings')[0])
        .put(evt.target.files[0]);
      uploadTask.on(
        'state_changed', // Метод позволяет назначить 3 наблюдателей
        // 1 Срабатывает каждый раз при изменении состояния
        (snapshot) => {
          // для примера выводим % загрузки
          console.log(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100 + '%'
          );
          this.progressLoad =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        // 2 При ошибке
        (err) => {
          alert(err.message);
        },
        // 3 При успешном заверщении загрузки
        // Получаем ссылку на загруженый файл.
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            console.log('🚀 ~ .then ~ url:', url);
            this.$refs.img.src = url;
          });
          this.loadImg = false;
        }
      );
    },
    deleteImg() {
      const type = this.currentPosition.type.split('Settings')[0];
      this.$refs.img.src = this.$store.getters.getDefaultImg[type];
      this.bgPosition.top = 0;
      this.bgPosition.left = 0;
      this.zoom = 1;
    },
  },
};
</script>

<style scoped lang="sass">

$black: #362c36
$grey: #4d4c59
$light-grey: #71777d
// $light-grey: color.adjust($color, $lightness: 10%)
$light-blue: #a7cbd5
$white: #f7f6f0

.modal-bg
  position: absolute
  top: 0
  left: 0
  height: 100%
  width: 100%
  background-color: #0000006e



.edit
  &__bg
    width: 45rem
    & div.modal
      &-content
        height: 20rem

        &__photo
          height: 16rem

          & div.modal-content__photo__bg:after
              width: 20rem
              height: 20rem
              border-radius: 12rem
              box-shadow: 0 0 0 26rem rgba(0, 0, 0, .48627450980392156)


          &__bg
            height: 15rem
            &::after
              width: 40rem
              height: 10rem
              box-shadow: 0px 0px 0px 5rem #0000007c
          &__wrap
            width: 40rem
            height: 10rem
  &__photo
    width: 27rem
    & div.modal
      &-content
        height: 27rem
        &__photo
          height: 23rem
          &__bg
            height: 23rem
            &::after
              width: 20rem
              height: 20rem
              border-radius: 12rem
              box-shadow: 0px 0px 0px 26rem #0000007c
          &__wrap
            width: 20rem
            height: 20rem

.modal
  height: fit-content
  background-color: $white
  border-radius: 0.5rem
  &-header
    display: flex
    justify-content: space-between
    padding: 0.5rem
    font-size: 1.2rem
    & span
      padding: 0.2rem 0.5rem
    & span:last-child
      padding: 0.3rem 0.5rem
      cursor: pointer
      font-size: 1rem
      border: 1px solid $black
      border-radius: 0.5rem
      opacity: 0.5
      &:hover
        opacity: 1
        border-color: $light-blue
        color: $light-blue
        // color: darken($light-blue, 10%)
  &-content
    background-color: #000
    &__photo
      position: relative
      overflow: hidden
      height: 400px
      &__bg
        position: relative
        display: flex
        justify-content: center
        align-items: center
        width: 100%
        height: 100%
        &::after
          position: absolute
          content: ''
          pointer-events: none
          border: 2px solid $white
      &__wrap
        position: relative
        display: flex
        align-items: center
        justify-content: center
        width: 300px
        height: 300px
        & img
          position: absolute
          display: block
          cursor: move
          width: 100%
          // height: 100%
    &__tools
      width: stretch
      padding: 0 1rem
      & p
        margin: 0
        padding: 0.2rem 0.5rem
        font-size: 1rem
        color: $white
        text-align: center
      & input
        width: stretch
        background-color: #fff
  &-btn
    display: flex
    justify-content: space-between
    padding: 1rem
    & button
      cursor: pointer
      font-size: 1rem
      outline: none
      padding: 0.2rem 0.5rem
      border-radius: 0.5rem
    &__delete
      opacity: 0.6
      border: none
      &:hover
        opacity: 0.7
        background-color: #7474749a
    & div
      & button:first-child
        position: relative
        margin-right: 0.5rem
        color: $black
        border: 1px solid $black
        & input
          position: absolute
          opacity: 0
          left: 0
          width: 100%
      & button:last-child
        // color: color.adjust($light-blue, -25%)
        color: $light-blue
        // border: 1px solid color.adjust($light-blue, -25%)
        border: 1px solid $black

.progress
  position: absolute
  width: stretch
  height: 100%
  display: flex
  align-items: center
  justify-content: center
  background-color: #00000086
  & progress
    width: stretch
    max-width: 20rem
    height: 1.5rem
</style>
