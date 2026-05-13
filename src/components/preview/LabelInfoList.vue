<template>
  <div class="label-middle" :style="padStyle(store.paddingInfo)">
    <div class="label-info-side" ref="infoContainerRef">
      <div
        v-for="(line, i) in store.parsedInfoLines"
        :key="i"
        class="info-line"
        :style="{ fontSize: store.fontSizeInfo + 'mm' }"
      >
        <span v-if="line.key" class="info-key">{{ line.key }}</span>
        <span class="info-val">{{ line.val }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'
import { useLabelStore, padStyle } from '../../composables/useLabelStore'

const store = useLabelStore()
const infoContainerRef = ref(null)

async function shrinkInfoLines() {
  await nextTick()
  if (!infoContainerRef.value) return
  const maxWidth = infoContainerRef.value.offsetWidth
  infoContainerRef.value.querySelectorAll('.info-line').forEach((el) => {
    el.style.fontSize = `${store.fontSizeInfo}mm`
    let size = store.fontSizeInfo
    while (el.scrollWidth > maxWidth && size > 1.2) {
      size -= 0.05
      el.style.fontSize = `${size}mm`
    }
  })
}

watch(() => [store.fontSizeInfo, store.labelWidth, store.parsedInfoLines], shrinkInfoLines, { flush: 'post' })
onMounted(() => nextTick(shrinkInfoLines))
</script>
