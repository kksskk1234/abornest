<template>
  <div class="label-footer">
    <canvas ref="barcodeRef" style="max-width: 95%; height: auto !important; image-rendering: pixelated"></canvas>
    <div class="barcode-text">{{ store.barcodeValue }}</div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'
import JsBarcode from 'jsbarcode'
import { useLabelStore } from '../../composables/useLabelStore'

const store = useLabelStore()
const barcodeRef = ref(null)

function generateBarcode() {
  if (!barcodeRef.value || !store.barcodeValue) return
  store.barcodeError = false
  try {
    JsBarcode(barcodeRef.value, store.barcodeValue, {
      format: 'CODE128',
      width: store.barcodeThickness,
      height: store.barcodeHeightVal,
      displayValue: false,
      margin: 30,
      background: '#ffffff',
    })
  } catch (e) {
    console.error('바코드 생성 실패:', e)
    store.barcodeError = true
  }
}

watch(() => [store.barcodeValue, store.barcodeThickness, store.barcodeHeightVal], () => nextTick(generateBarcode))
onMounted(() => nextTick(generateBarcode))
</script>
