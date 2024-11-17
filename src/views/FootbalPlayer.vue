<template>
  <div class="card">
    <div class="card-container">
      <div class="card__content">
        <div class="card-image-container" @click="isVisibleModal = true">
          <img
            :src="imgDefaultSettings.src"
            alt="Фото"
            class="card-image"
            :style="setStyleImg(imgDefaultSettings)"
          />
        </div>
        <div class="card-content">
          <button
            v-if="!isEditText"
            class="card__edit-btn"
            @click="isEditText = true"
          />

          <button
            v-else
            class="card__edit-btn card__edit-btn--input"
            @click="isEditText = false"
          />

          <div class="card__title-container">
            <input
              v-if="isEditText"
              v-model="playerName"
              class="card__input-title"
            />

            <h1 v-else class="card__title">
              {{ playerName }}
            </h1>
          </div>

          <div class="card-text__container">
            <textarea
              v-if="isEditText"
              v-model="playerText"
              class="card-text__area"
            />
            <p v-else class="card-text">
              {{ playerText }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <ChangePhoto
      v-if="isVisibleModal"
      :id="1"
      :current-position="imgDefaultSettings"
      @close-modal="isVisibleModal = false"
      @save="(type, setting) => savePhotoSettings(type, setting)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import ChangePhoto from './../components/ChangePhoto.vue';

const playerName = ref('Ширяев Владимир');
const isEditText = ref(false);

const playerText = ref(
  'В матче с командой “Ока” нам не удалось в полной мере реализовать наши сильные игровые комбинации. Навашинцы борются за третье место и им было крайне важно выигрывать. Но мы не расстраиваемся, мы в любом случае навязали сопернику мощную игру, а, как говорится, без поражений не бывает побед! Осталось два тура и мы настроены на 100%!'
);

const isVisibleModal = ref(false);

const imgDefaultSettings = reactive({
  top: -10,
  left: -20,
  width: 140,
  src: 'https://firebasestorage.googleapis.com/v0/b/football-80212.appspot.com/o/%D0%B1%D1%8D%D0%BA%D1%85%D1%8D%D0%BC.jpg?alt=media&token=585c19cf-29bb-43e4-b655-95100ec08618',
  type: 'image',
  difference: 0.6,
  class: 'edit__photo',
});

const setStyleImg = (style) => {
  return `top: ${style.top}px; left: ${style.left}px; width: ${style.width}%`;
};

const savePhotoSettings = (type, settings) => {
  console.log('🚀 ~ savePhotoSettings ~ type, settings:', type, settings);
  Object.assign(imgDefaultSettings, settings);
  isVisibleModal.value = false;
  console.log(
    '🚀 ~ savePhotoSettings ~ imgDefaultSettings:',
    imgDefaultSettings
  );
};
</script>

<style lang="scss" scoped>
.card {
  height: 700px;
  width: 1400px;
  display: flex;
  align-items: center;
  position: relative;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    background-image: url('./../assets/img/bg_team.jpg');
    width: 100%;
    height: 100%;
    background-position: 59% 61%;
    background-size: 118%;
    filter: brightness(63%);
    -webkit-filter: brightness(63%);
    -moz-filter: brightness(63%);
    z-index: -1;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
    // position: relative;
  }

  &__edit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 28px;
    background-image: url('./../assets/icons/edit.svg');
    background-size: 16px;
    background-position: center;
    background-color: transparent;
    background-repeat: no-repeat;
    border-radius: 4px;
    cursor: pointer;
    opacity: 0.4;
    transition: 0.3s opacity;
    position: absolute;
    right: 13px;
    top: 14px;

    &:hover {
      opacity: 1;
      transition: 0.3s opacity;
    }

    &--input {
      background-image: url('./../assets/icons/check.svg');
    }
  }

  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: fit-content;
    font-size: 24px;
    font-weight: bold;
    color: #000;
    gap: 4px;
  }

  &__title-container {
    margin-bottom: 16px;
  }

  &__input-title {
    padding: 2px 12px;
    font-size: 19px;
    font-weight: bold;
    color: #000;
    border-radius: 8px;
    background-color: #ffffff9c;
  }
}

.card-container {
  padding: 16px;
  border-radius: 16px;
  width: 800px;
  margin: 0 auto;
  position: relative;

  .card-content {
    position: relative;
    background-color: #ffffffbf; // Белый фон
    border-radius: 16px;
    padding: 16px;
    -webkit-box-shadow: 7px 9px 15px 1px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 7px 9px 15px 1px rgba(0, 0, 0, 0.75);
    box-shadow: 7px 9px 15px 1px rgba(0, 0, 0, 0.75);
    max-width: calc(800px - 196px - 16px);
    transform: translateX(16px);

    .card-text {
      color: #000; // Серый текст
      font-size: 18px;
      line-height: 1.5;

      &__area {
        width: 524px;
        height: 190px;
        padding: 2px 12px;
        color: #000; // Серый текст
        font-size: 18px;
        line-height: 1.4;
        border-radius: 10px;
        background-color: #ffffff9c;
        font-family: 'Montserrat', sans-serif;
      }
    }
  }
  .card-image-container {
    width: 196px;
    height: 196px;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    border: 4px solid #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    left: 0;

    & img {
      position: absolute;
    }
  }
}
</style>
