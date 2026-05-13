<template>
  <div class="padding-controls">
    <div class="pad-cell">
      <span class="size-hint">상</span>
      <input type="number" :value="modelValue.top" @input="update('top', $event)" step="0.5" min="0" class="small-input" />
    </div>
    <div class="pad-cell">
      <span class="size-hint">우</span>
      <input type="number" :value="modelValue.right" @input="update('right', $event)" step="0.5" min="0" class="small-input" />
    </div>
    <div class="pad-cell">
      <span class="size-hint">하</span>
      <input type="number" :value="modelValue.bottom" @input="update('bottom', $event)" step="0.5" min="0" class="small-input" />
    </div>
    <div class="pad-cell">
      <span class="size-hint">좌</span>
      <input type="number" :value="modelValue.left" @input="update('left', $event)" step="0.5" min="0" class="small-input" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Object, required: true },
})
const emit = defineEmits(['update:modelValue'])

function update(key, event) {
  const val = +event.target.value
  emit('update:modelValue', { ...props.modelValue, [key]: isNaN(val) ? 0 : val })
}
</script>
