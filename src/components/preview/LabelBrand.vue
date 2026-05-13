<template>
  <div class="label-brand-side" :style="padStyle(store.paddingBrand)">
    <div class="label-brand" ref="brandRef" :style="{ fontSize: store.fontSizeBrand + 'mm' }">
      {{ store.brand }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'
import { useLabelStore, padStyle } from '../../composables/useLabelStore'

const store = useLabelStore()
const brandRef = ref(null)

async function shrinkBrand() {
  await nextTick()
  if (!brandRef.value) return
  const maxWidth = brandRef.value.parentElement?.offsetWidth ?? Infinity
  brandRef.value.style.fontSize = `${store.fontSizeBrand}mm`
  let size = store.fontSizeBrand
  while (brandRef.value.offsetWidth > maxWidth && size > 5) {
    size -= 0.5
    brandRef.value.style.fontSize = `${size}mm`
  }
}

watch(() => [store.brand, store.fontSizeBrand, store.labelWidth], shrinkBrand, { flush: 'post' })
onMounted(() => nextTick(shrinkBrand))
</script>
