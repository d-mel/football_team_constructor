<script setup lang="ts">
import MainTeam from './views/MainTeam.vue';
import TableTeams from './views/TableTeams.vue';
import FinalCount from './views/FinalCount.vue';
import FootbalPlayer from './views/FootbalPlayer.vue';
import { computed, ref } from 'vue';
import html2canvas from 'html2canvas';

const tabs = computed(() => [
  {
    id: 'team',
    name: 'Команда',
  },
  // {
  //   id: 'table',
  //   name: 'Таблица',
  // },
  // {
  //   id: 'count',
  //   name: 'Счет',
  // },
  {
    id: 'interview',
    name: 'О матче',
  },
]);

const activeTab = ref('team');

const dataURItoBlob = (dataURI: string) => {
  const byteString = atob(dataURI.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: 'image/jpeg' });
};

// TODO сделать скачивание для остальных разделов
const download = () => {
  const imgContainer = document.querySelector('.main-team');
  imgContainer.classList.add('download');
  console.log('🚀 ~ download ~ imgContainer:', imgContainer);
  if (imgContainer) {
    html2canvas(imgContainer as HTMLElement, {
      windowWidth: 1600,
      windowHeight: 960,
      width: 1600,
      height: 960,
      scale: 3,
    }).then(function (canvas) {
      const imgData = canvas.toDataURL('image/jpeg');

      const blob = dataURItoBlob(imgData);
      const docUrl = document.createElement('a');
      docUrl.href = URL.createObjectURL(blob);
      docUrl.setAttribute('download', 'pres.jpg');
      document.body.appendChild(docUrl);
      docUrl.click();
      imgContainer.classList.remove('download');
    });
  }
};
</script>

<template>
  <div class="main">
    <div class="main__tabs flex-center">
      <span
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab', { 'tab--active': activeTab === tab.id }]"
        @click="activeTab = tab.id"
        >{{ tab.name }}</span
      >
    </div>
    <div class="main__content">
      <button class="main__btn" @click="download">
        <span>Скачать</span>
      </button>
      <MainTeam v-if="activeTab === 'team'" />
      <TableTeams v-if="activeTab === 'table'" />
      <FinalCount v-if="activeTab === 'count'" />
      <FootbalPlayer v-if="activeTab === 'interview'" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
  }

  &__btn {
    display: flex;
    align-self: flex-end;
    font-size: 16px;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 6px;
    cursor: pointer;
    margin-right: 120px;

    &::before {
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      background-image: url('./assets/icons/uploader.svg');
    }
  }

  &__tabs {
    display: flex;
    gap: 12px;
    padding: 20px 0 0;

    .tab {
      cursor: pointer;
      font-size: 20px;
      font-weight: 500;
      padding: 6px 18px;
      border-radius: 20px;

      &:hover {
        opacity: 0.6;
      }

      &--active {
        text-decoration: underline;
      }
    }
  }
}
</style>
