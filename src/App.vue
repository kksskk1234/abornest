<template>
  <div class="container">
    <EditorPanel @export-pdf="previewRef.exportPDF()" />
    <LabelPreview ref="previewRef" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import EditorPanel from './components/EditorPanel.vue'
import LabelPreview from './components/LabelPreview.vue'

const previewRef = ref(null)
</script>
