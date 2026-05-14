<template>
  <div class="preview">
    <div class="label-container" ref="labelRef" :style="store.labelContainerStyle">
      <div class="label-inner" :style="store.labelInnerStyle">
        <LabelBrand v-if="store.showBrand" />
        <LabelTitle v-if="store.showTitle" />
        <LabelInfoList v-if="store.showInfo" />
        <LabelCaution v-if="store.showCaution" />
        <LabelBarcode v-if="store.showBarcode" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'
import html2pdf from 'html2pdf.js'
import { useLabelStore } from '../composables/useLabelStore'
import LabelBrand from './preview/LabelBrand.vue'
import LabelTitle from './preview/LabelTitle.vue'
import LabelInfoList from './preview/LabelInfoList.vue'
import LabelCaution from './preview/LabelCaution.vue'
import LabelBarcode from './preview/LabelBarcode.vue'

const store = useLabelStore()
const labelRef = ref(null)

async function updateActualHeight() {
  if (!store.autoHeight || !labelRef.value) return
  await nextTick()
  store.labelHeight = Math.ceil(labelRef.value.offsetHeight * 0.264583)
}

watch(
  () => [
    store.parsedInfoLines, store.parsedCautionLines,
    store.brand, store.title,
    store.fontSizeBrand, store.fontSizeTitle, store.fontSizeInfo, store.fontSizeCaution,
    store.autoHeight, store.labelWidth,
    store.showBrand, store.showTitle, store.showInfo, store.showCaution, store.showBarcode,
  ],
  updateActualHeight,
  { flush: 'post' }
)

onMounted(() => nextTick(updateActualHeight))

async function exportPDF() {
  store.pdfLoading = true
  try {
    await document.fonts.ready
    await new Promise((resolve) => setTimeout(resolve, 500))

    const element = labelRef.value
    const fileName = `${store.title || 'label'}_barcode.pdf`
    const widthMm = store.labelWidth
    const heightMm = store.autoHeight ? element.offsetHeight * 0.264583 : store.labelHeight
    const orientation = widthMm > heightMm ? 'landscape' : 'portrait'

    await html2pdf()
      .set({
        margin: 0,
        filename: fileName,
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { scale: 3, useCORS: true, allowTaint: false, letterRendering: true, logging: false },
        jsPDF: { unit: 'mm', format: [widthMm, heightMm], orientation, compress: true },
      })
      .from(element)
      .save()
  } catch (error) {
    console.error('PDF 생성 중 오류 발생:', error)
    alert('PDF 생성 중 오류가 발생했습니다.')
  } finally {
    store.pdfLoading = false
  }
}

defineExpose({ exportPDF })
</script>
