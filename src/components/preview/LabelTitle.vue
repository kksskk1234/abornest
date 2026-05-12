<template>
  <div class="label-header">
    <div class="label-title" :style="{ fontSize: store.fontSizeTitle + 'mm' }">{{ store.title }}</div>
  </div>
</template>

<script setup>
import { useLabelStore } from '../../composables/useLabelStore'

const store = useLabelStore()
</script>
