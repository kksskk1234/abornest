<template>
  <div class="form-group size-settings">
    <label class="size-label">📏 라벨 규격 설정 (mm)</label>
    <div class="size-inputs">
      <div style="flex: 1">
        <span class="size-hint">가로(W)</span>
        <input type="number" v-model.number="store.labelWidth" min="10" max="300" style="margin-top: 2px; padding: 5px 8px" />
      </div>
      <div style="flex: 1">
        <span class="size-hint">세로(H)</span>
        <input type="number" v-model.number="store.labelHeight" min="10" max="500" :disabled="store.autoHeight" style="margin-top: 2px; padding: 5px 8px" />
      </div>
    </div>
    <div class="auto-height-row">
      <input type="checkbox" id="checkAutoHeight" v-model="store.autoHeight" style="width: auto; height: auto" />
      <label for="checkAutoHeight" style="margin-bottom: 0; font-size: 0.75rem; font-weight: 600; cursor: pointer; color: #475569">
        내용에 맞춰 세로 자동 확장
      </label>
    </div>
  </div>
</template>

<script setup>
import { useLabelStore } from '../../composables/useLabelStore'

const store = useLabelStore()
</script>
