<script setup lang="ts">
import ChangePhoto from './components/ChangePhoto.vue';

const obj = {
  top: 0,
  left: 0,
  width: '100%',
  type: 'image',
  difference: 1,
};
</script>

<template>
  <h1>This is the football!</h1>
  <ChangePhoto id="id" :current-position="obj" />
</template>
