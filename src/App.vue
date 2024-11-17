<script setup lang="ts">
import MainTeam from './views/MainTeam.vue';
import TableTeams from './views/TableTeams.vue';
import FinalCount from './views/FinalCount.vue';
import FootbalPlayer from './views/FootbalPlayer.vue';
import { computed, ref } from 'vue';

const tabs = computed(() => [
  {
    id: 'team',
    name: 'Команда',
  },
  {
    id: 'table',
    name: 'Таблица',
  },
  {
    id: 'count',
    name: 'Счет',
  },
  {
    id: 'interview',
    name: 'О матче',
  },
]);

const activeTab = ref('interview');
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
      <MainTeam v-if="activeTab === 'team'" />
      <TableTeams v-if="activeTab === 'table'" />
      <FinalCount v-if="activeTab === 'count'" />
      <FootbalPlayer v-if="activeTab === 'interview'" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  // padding: 20px 40px;

  &__content {
    display: flex;
    justify-content: center;
  }

  &__tabs {
    display: flex;
    gap: 12px;
    padding: 20px 0 0;
    margin-bottom: 40px;

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
