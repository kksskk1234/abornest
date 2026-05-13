<template>
  <div class="form-group" :class="{ 'field-disabled': !store.showCaution }">
    <div class="field-header">
      <div class="field-label-group" style="flex: 1; min-width: 0">
        <input type="checkbox" v-model="store.showCaution" class="show-checkbox" />
        <input
          type="text"
          v-model="store.cautionTitle"
          placeholder="섹션 제목 (예: 주의사항)"
          class="section-title-input"
        />
      </div>
      <div class="font-size-control">
        <button
          type="button"
          class="padding-toggle"
          :class="{ active: showPadding }"
          @click="showPadding = !showPadding"
          title="패딩 조절"
        >⚙ 패딩 {{ showPadding ? '▴' : '▾' }}</button>
        <span class="size-hint">크기(mm)</span>
        <input type="number" v-model.number="store.fontSizeCaution" step="0.05" min="1" max="10" class="small-input" />
      </div>
    </div>
    <PaddingControls v-if="showPadding" v-model="store.paddingCaution" />
    <textarea v-model="store.cautionText" rows="5" placeholder="한 줄에 하나씩 입력"></textarea>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLabelStore } from '../../composables/useLabelStore'
import PaddingControls from './PaddingControls.vue'

const store = useLabelStore()
const showPadding = ref(false)
</script>
