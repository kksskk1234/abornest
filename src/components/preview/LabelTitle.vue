<template>
  <div class="label-header" :style="padStyle(store.paddingTitle)">
    <div class="label-title" :style="{ fontSize: store.fontSizeTitle + 'mm' }">{{ store.title }}</div>
  </div>
</template>

<script setup>
import { useLabelStore, padStyle } from '../../composables/useLabelStore'

const store = useLabelStore()
</script>
