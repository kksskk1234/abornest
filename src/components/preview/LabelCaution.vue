<template>
  <div class="label-content" :style="padStyle(store.paddingCaution)">
    <div class="caution-section">
      <span v-if="store.cautionTitle" class="caution-title">{{ store.cautionTitle }}</span>
      <ul class="caution-list">
        <li
          v-for="(line, i) in store.parsedCautionLines"
          :key="i"
          :style="{ fontSize: store.fontSizeCaution + 'mm' }"
        >
          {{ line }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useLabelStore, padStyle } from '../../composables/useLabelStore'

const store = useLabelStore()
</script>
