<template>
  <div v-if="teamInfo" class="main-team">
    <button v-if="!isEditText" class="edit-button" @click="isEditText = true" />

    <button
      v-else
      class="edit-button edit-button--input"
      @click="saveEditedText"
    />

    <div class="main-team__item team__logo">
      <div class="item__img logo__img" @click="changePhoto(teamInfo.logo.id)">
        <img
          :src="teamInfo.logo.photoSettings.src"
          alt=""
          :style="setStyleImg(teamInfo.logo.photoSettings)"
        />
      </div>
      <div class="logo__info">
        <p class="logo__name">
          <input
            v-if="isEditText"
            v-model="teamInfo.logo.name"
            class="input input__logo-name"
          />
          <span v-else> {{ teamInfo.logo.name }}</span>
        </p>
        <p class="logo__city">
          <input
            v-if="isEditText"
            v-model="teamInfo.logo.city"
            class="input input__logo-city"
          />
          <span v-else> {{ teamInfo.logo.city }}</span>
        </p>
      </div>
    </div>

    <div class="main-team__item team__couch">
      <p>Тренер</p>
      <div class="item__img" @click="changePhoto(teamInfo.couch.id)">
        <img
          :src="teamInfo.couch.photoSettings.src"
          alt=""
          :style="setStyleImg(teamInfo.couch.photoSettings)"
        />
      </div>
      <p class="item__name">
        <input
          v-if="isEditText"
          v-model="teamInfo.couch.name"
          class="input input__couch"
        />
        <span v-else> {{ teamInfo.couch.name }}</span>
      </p>
    </div>

    <div class="team">
      <div :class="['team__item', `team__item--${teamInfo.team[0].position}`]">
        <div class="item__img" @click="changePhoto(teamInfo.team[0].id)">
          <img
            :src="teamInfo.team[0].photoSettings.src"
            alt=""
            :style="setStyleImg(teamInfo.team[0].photoSettings)"
          />
        </div>
        <p class="item__name">
          <input
            v-if="isEditText"
            v-model="teamInfo.team[0].name"
            class="input input__team-name"
          />
          <span v-else> {{ teamInfo.team[0].name }}</span>
        </p>
        <p class="item__number">
          <input
            v-if="isEditText"
            v-model="teamInfo.team[0].number"
            class="input input__team-number"
          />
          <span v-else> {{ teamInfo.team[0].number }}</span>
        </p>
      </div>
      <div :class="['team__item', `team__item--${teamInfo.team[1].position}`]">
        <div class="item__img" @click="changePhoto(teamInfo.team[1].id)">
          <img
            :src="teamInfo.team[1].photoSettings.src"
            alt=""
            :style="setStyleImg(teamInfo.team[1].photoSettings)"
          />
        </div>
        <p class="item__name">
          <input
            v-if="isEditText"
            v-model="teamInfo.team[1].name"
            class="input input__team-name"
          />
          <span v-else> {{ teamInfo.team[1].name }}</span>
        </p>
        <p class="item__number">
          <input
            v-if="isEditText"
            v-model="teamInfo.team[1].number"
            class="input input__team-number"
          />
          <span v-else> {{ teamInfo.team[1].number }}</span>
        </p>
      </div>

      <div class="flex-center">
        <div
          :class="['team__item', `team__item--${teamInfo.team[2].position}`]"
        >
          <div class="item__img" @click="changePhoto(teamInfo.team[2].id)">
            <img
              :src="teamInfo.team[2].photoSettings.src"
              alt=""
              :style="setStyleImg(teamInfo.team[2].photoSettings)"
            />
          </div>
          <p class="item__name">
            <input
              v-if="isEditText"
              v-model="teamInfo.team[2].name"
              class="input input__team-name"
            />
            <span v-else> {{ teamInfo.team[2].name }}</span>
          </p>
          <p class="item__number">
            <input
              v-if="isEditText"
              v-model="teamInfo.team[2].number"
              class="input input__team-number"
            />
            <span v-else> {{ teamInfo.team[2].number }}</span>
          </p>
        </div>

        <div
          :class="['team__item', `team__item--${teamInfo.team[3].position}`]"
        >
          <div class="item__img" @click="changePhoto(teamInfo.team[3].id)">
            <img
              :src="teamInfo.team[3].photoSettings.src"
              alt=""
              :style="setStyleImg(teamInfo.team[3].photoSettings)"
            />
          </div>
          <p class="item__name">
            <input
              v-if="isEditText"
              v-model="teamInfo.team[3].name"
              class="input input__team-name"
            />
            <span v-else> {{ teamInfo.team[3].name }}</span>
          </p>
          <p class="item__number">
            <input
              v-if="isEditText"
              v-model="teamInfo.team[3].number"
              class="input input__team-number"
            />
            <span v-else> {{ teamInfo.team[3].number }}</span>
          </p>
        </div>
      </div>

      <div :class="['team__item', `team__item--${teamInfo.team[4].position}`]">
        <div class="item__img" @click="changePhoto(teamInfo.team[4].id)">
          <img
            :src="teamInfo.team[4].photoSettings.src"
            alt=""
            :style="setStyleImg(teamInfo.team[4].photoSettings)"
          />
        </div>
        <p class="item__name">
          <input
            v-if="isEditText"
            v-model="teamInfo.team[4].name"
            class="input input__team-name"
          />
          <span v-else> {{ teamInfo.team[4].name }}</span>
        </p>
        <p class="item__number">
          <input
            v-if="isEditText"
            v-model="teamInfo.team[4].number"
            class="input input__team-number"
          />
          <span v-else> {{ teamInfo.team[4].number }}</span>
        </p>
      </div>
    </div>
  </div>

  <ChangePhoto
    v-if="isVisibleModal"
    :id="idPhoto"
    :current-position="computedImgSettings"
    @close-modal="isVisibleModal = false"
    @save="(type, setting) => savePhotoSettings(type, setting)"
  />
</template>

<script lang="ts" setup>
import type { TeamInfoType } from './../types/teamInfo.ts';
import ChangePhoto from './../components/ChangePhoto.vue';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const isVisibleModal = ref(false);

const computedImgSettings = ref();

const idPhoto = ref<number | string>();

const changePhoto = (personId: string | number) => {
  isVisibleModal.value = true;
  idPhoto.value = personId;
  let personStyle;
  if (typeof personId === 'number') {
    personStyle = teamInfo.value?.team.find(
      (player) => player.id === personId
    )?.photoSettings;
  } else {
    personStyle = teamInfo.value[personId]?.photoSettings;
  }
  computedImgSettings.value = {
    ...imgDefaultSettings,
    ...personStyle,
  };
};

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

const isEditText = ref(false);

const teamInfo = ref<TeamInfoType>();

const savePhotoSettings = (type, settings) => {
  if (typeof idPhoto.value === 'number') {
    const player = teamInfo.value?.team.find(
      (player) => player.id === idPhoto.value
    );
    Object.assign(player?.photoSettings, settings);
  } else {
    Object.assign(teamInfo.value[idPhoto.value]?.photoSettings, settings);
  }

  store.dispatch('changeTeamInfo', { type, data: teamInfo.value }).then(() => {
    store.dispatch('getTeamInfo').then((data) => {
      teamInfo.value = data;
      isVisibleModal.value = false;
    });
  });

  isVisibleModal.value = false;
};

const saveEditedText = () => {
  store.dispatch('changeTeamInfo', { data: teamInfo.value }).then(() => {
    store.dispatch('getTeamInfo').then((data) => {
      teamInfo.value = data;
      isEditText.value = false;
    });
  });
};

onMounted(async () => {
  store.dispatch('getTeamInfo').then((data: TeamInfoType) => {
    store.commit('setTeamInfo', data);
    teamInfo.value = data;
  });
});
</script>

<style lang="scss" scoped>
.flex-center {
  gap: 40px;
}

.main-team {
  position: relative;
  width: 1600px;
  min-width: 1600px;
  height: 960px;
  color: #fff;
  font-weight: 500;

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
    filter: brightness(45%);
    -webkit-filter: brightness(45%);
    -moz-filter: brightness(45%);
    z-index: -1;
  }

  .edit-button {
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: #fff;
  }

  &__item {
    height: 250px;
    width: 200px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .item {
    &__img {
      width: 196px;
      height: 196px;
      border-radius: 50%;
      overflow: hidden;
      position: absolute;
      transform: scale3d(0.6, 0.6, 1);
      outline: 7px solid white;

      & img {
        position: absolute;
      }
    }

    &__name {
      padding-top: 145px;
      font-weight: 600;
    }
  }

  .logo {
    &__img {
      margin-top: 0;
      transform: scale3d(1.15, 1.15, 1);
      outline: none;
    }

    &__info {
      margin-top: 187px;
      text-align: center;
      font-weight: 600;
      display: grid;
      gap: 4px;
      z-index: 1;
    }

    &__name {
      font-size: 22px;
    }

    &__city {
      font-size: 18px;
    }
  }

  .team {
    display: grid;
    grid-template-columns: 1fr;
    margin-top: 260px;

    &__logo {
      position: absolute;
      top: 2%;
      right: 690px;
      text-shadow: 2px 2px 2px black;
      z-index: 5;
    }

    &__couch {
      position: absolute;
      top: 3%;
      left: 23%;
      font-weight: 600;
      text-shadow: 2px 2px 2px black;
    }

    &__item {
      width: 200px;
      height: 186px;
      position: relative;
      margin-top: -16px;

      .item {
        &__img {
          margin-top: 0;
        }

        &__name {
          text-align: center;
          padding-top: 165px;
          text-shadow: 2px 2px 2px black;
        }

        &__number {
          position: absolute;
          left: 69%;
          top: 24px;
          font-size: 46px;
          font-weight: 600;
          text-shadow: 2px 2px 2px black;
        }
      }

      &--1 {
        transform: translateX(715px);
        z-index: 4;
      }

      &--2 {
        transform: translateX(715px);
        z-index: 3;
      }
      &--3 {
        z-index: 2;
      }
      &--4 {
        z-index: 2;
      }
      &--5 {
        transform: translateX(715px);
        z-index: 1;
      }
    }
  }

  .input {
    padding: 2px 12px;
    font-size: 19px;
    font-weight: 400;
    color: #000;
    border-radius: 8px;
    background-color: #ffffff9c;
    width: 200px;

    &__team {
      &-number {
        width: 60px;
      }
    }
  }
}

.download {
  .edit-button {
    display: none;
  }
}
</style>
