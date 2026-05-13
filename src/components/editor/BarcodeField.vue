<template>
  <div class="form-group" :class="{ 'field-disabled': !store.showBarcode }">
    <div class="field-header">
      <div class="field-label-group">
        <input type="checkbox" v-model="store.showBarcode" class="show-checkbox" />
        <label style="margin-bottom: 0">바코드 (숫자 및 영문 혼합 가능)</label>
      </div>
      <div class="font-size-control" style="gap: 8px">
        <button
          type="button"
          class="padding-toggle"
          :class="{ active: showPadding }"
          @click="showPadding = !showPadding"
          title="패딩 조절"
        >⚙ 패딩 {{ showPadding ? '▴' : '▾' }}</button>
        <div style="display: flex; align-items: center; gap: 4px">
          <span class="size-hint">두께</span>
          <input type="number" v-model.number="store.barcodeThickness" step="0.1" min="1" max="5" class="small-input" />
        </div>
        <div style="display: flex; align-items: center; gap: 4px">
          <span class="size-hint">높이(px)</span>
          <input type="number" v-model.number="store.barcodeHeightVal" step="5" min="20" max="200" class="small-input" />
        </div>
      </div>
    </div>
    <PaddingControls v-if="showPadding" v-model="store.paddingBarcode" />
    <input type="text" v-model="store.barcodeValue" />
    <div v-if="store.barcodeError" class="barcode-error">⚠ 올바른 형식이 아닙니다.</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLabelStore } from '../../composables/useLabelStore'
import PaddingControls from './PaddingControls.vue'

const store = useLabelStore()
const showPadding = ref(false)
</script>
