<template>
  <div v-if="teamInfo" class="main-team">
    <div class="main-team__item team__couch">
      <p>Тренер</p>
      <div class="item__img" @click="changePhoto">
        <img
          :src="teamInfo.couch.photoSettings.src"
          alt=""
          :style="setStyleImg(teamInfo.couch.photoSettings)"
        />
      </div>
      <p class="item__name">{{ teamInfo.couch.name }}</p>
    </div>
    <div class="main-team__item team__logo">
      <div class="item__img logo__img" @click="changePhoto">
        <img
          :src="teamInfo.logo.photoSettings.src"
          alt=""
          :style="setStyleImg(teamInfo.logo.photoSettings)"
        />
      </div>
      <div class="logo__info">
        <p class="logo__name">{{ teamInfo.logo.name }}</p>
        <p class="logo__city">{{ teamInfo.logo.city }}</p>
      </div>
    </div>

    <div class="team">
      <div
        v-for="item in teamInfo.team"
        :key="item.id"
        :class="['team__item', `team__item--${item.position}`]"
      >
        <div class="item__img" @click="changePhoto">
          <img
            :src="item.photoSettings.src"
            alt=""
            :style="setStyleImg(item.photoSettings)"
          />
        </div>
        <p class="item__name">{{ item.name }}</p>
        <p class="item__position">позиция {{ item.position }}</p>
        <p class="item__number">номер {{ item.number }}</p>
      </div>
    </div>
  </div>

  <ChangePhoto
    v-if="isVisibleModal"
    :id="1"
    :current-position="computedImgSettings"
    @close-modal="isVisibleModal = false"
    @save="(type, setting) => savePhotoSettings(type, setting)"
  />
</template>

<script lang="ts" setup>
import type { TeamInfoType } from './../types/teamInfo.ts';
import ChangePhoto from './../components/ChangePhoto.vue';
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const isVisibleModal = ref(false);

const computedImgSettings = ref();

const changePhoto = () => {
  isVisibleModal.value = true;
  computedImgSettings.value = {
    ...imgDefaultSettings,
    ...teamInfo.value.couch.photoSettings,
  };
};

const styleImg = computed(() => {
  return `top: ${teamInfo.value.couch.photoSettings.top}px; left: ${teamInfo.value.couch.photoSettings.left}px; width: ${teamInfo.value.couch.photoSettings.width}%`;
});

const setStyleImg = (style) => {
  return `top: ${style.top}px; left: ${style.left}px; width: ${style.width}%`;
};

const imgDefaultSettings = {
  top: 0,
  left: 0,
  width: 100,
  type: 'image',
  difference: 0.6,
  class: 'edit__photo',
};

const savePhotoSettings = (type, settings) => {
  store
    .dispatch('changeTeamInfo', { type, data: { photoSettings: settings } })
    .then(() => {
      store.dispatch('getTeamInfo').then((data) => {
        teamInfo.value = data;
        isVisibleModal.value = false;
        console.log('🚀 ~ store.dispatch ~ teamInfo.value:', teamInfo.value);
      });
    });

  isVisibleModal.value = false;
};

const teamInfo = ref<TeamInfoType>();

onMounted(async () => {
  store.dispatch('getTeamInfo').then((data: TeamInfoType) => {
    store.commit('setTeamInfo', data);
    teamInfo.value = data;
    console.log('🚀 ~ store.dispatch ~ teamInfo.value:', teamInfo.value);
  });
});
</script>

<style lang="scss" scoped>
.main-team {
  height: 400px;
  position: relative;

  &__item {
    height: 250px;
    width: 200px;
    display: flex;
    align-items: center;
    flex-direction: column;
    border: 1px solid blue;
  }

  .item {
    &__img {
      width: 196px;
      height: 196px;
      border-radius: 50%;
      overflow: hidden;
      position: absolute;
      margin-top: 24px;

      & img {
        position: absolute;
      }
    }

    &__name {
      padding-top: 150px;
    }
  }

  .logo {
    &__img {
      margin-top: 0;
    }

    &__info {
      margin-top: 150px;
    }
  }

  .team {
    display: grid;
    grid-template-columns: repeat(2, 200px);

    grid-template-areas:
      'A A'
      'B B'
      'C D '
      'E E ';

    &__item {
      width: 200px;
      height: 200px;

      .item {
        &__img {
          margin-top: 0;
        }

        &__name {
        }

        &__position {
        }
      }

      &--1 {
        grid-area: A;
      }

      &--2 {
        grid-area: B;
      }

      &--3 {
        grid-area: C;
      }

      &--4 {
        grid-area: D;
      }

      &--5 {
        grid-area: E;
      }
    }
  }
}
</style>
