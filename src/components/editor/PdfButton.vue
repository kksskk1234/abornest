<template>
  <button class="btn-pdf" @click="$emit('click')" :disabled="store.pdfLoading">
    <span>{{ store.pdfLoading ? '⏳' : '📄' }}</span>
    {{ store.pdfLoading ? 'PDF 생성 중...' : 'PDF 생성 및 다운로드' }}
  </button>
</template>

<script setup>
import { useLabelStore } from '../../composables/useLabelStore'

defineEmits(['click'])

const store = useLabelStore()
</script>
