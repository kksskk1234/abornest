<template>
  <div class="editor">
    <h1><span>🔖</span> 라벨 메이커</h1>
    <SizeSettings />
    <FontField
      label="브랜드명 (Logo)"
      v-model="store.brand"
      v-model:fontSize="store.fontSizeBrand"
      v-model:show="store.showBrand"
      v-model:padding="store.paddingBrand"
      :font-size-step="0.5" :font-size-min="2" :font-size-max="50"
    />
    <FontField
      label="제품명 (Title)"
      v-model="store.title"
      v-model:fontSize="store.fontSizeTitle"
      v-model:show="store.showTitle"
      v-model:padding="store.paddingTitle"
      :font-size-step="0.1" :font-size-min="1" :font-size-max="20"
    />
    <FontField
      label="품질표시사항 (항목:내용 형식)"
      v-model="store.infoText"
      v-model:fontSize="store.fontSizeInfo"
      v-model:show="store.showInfo"
      v-model:padding="store.paddingInfo"
      :font-size-step="0.05" :font-size-min="1" :font-size-max="10"
      multiline :rows="8"
    />
    <CautionField />
    <BarcodeField />
    <PdfButton @click="$emit('export-pdf')" />
  </div>
</template>

<script setup>
import { useLabelStore } from '../composables/useLabelStore'
import SizeSettings from './editor/SizeSettings.vue'
import FontField from './editor/FontField.vue'
import CautionField from './editor/CautionField.vue'
import BarcodeField from './editor/BarcodeField.vue'
import PdfButton from './editor/PdfButton.vue'

defineEmits(['export-pdf'])

const store = useLabelStore()
</script>
