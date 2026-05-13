<template>
  <div class="form-group" :class="{ 'field-disabled': show === false }">
    <div class="field-header">
      <div class="field-label-group">
        <input
          v-if="show !== undefined"
          type="checkbox"
          :checked="show"
          @change="$emit('update:show', $event.target.checked)"
          class="show-checkbox"
        />
        <label style="margin-bottom: 0">{{ label }}</label>
      </div>
      <div class="font-size-control">
        <button
          v-if="padding"
          type="button"
          class="padding-toggle"
          :class="{ active: showPadding }"
          @click="showPadding = !showPadding"
          title="패딩 조절"
        >⚙ 패딩 {{ showPadding ? '▴' : '▾' }}</button>
        <span class="size-hint">크기(mm)</span>
        <input
          type="number"
          :value="fontSize"
          @input="$emit('update:fontSize', +$event.target.value)"
          :step="fontSizeStep"
          :min="fontSizeMin"
          :max="fontSizeMax"
          class="small-input"
        />
      </div>
    </div>
    <PaddingControls
      v-if="padding && showPadding"
      :model-value="padding"
      @update:model-value="$emit('update:padding', $event)"
    />
    <textarea
      v-if="multiline"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :rows="rows"
    ></textarea>
    <input
      v-else
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PaddingControls from './PaddingControls.vue'

defineProps({
  label: String,
  modelValue: String,
  fontSize: Number,
  fontSizeStep: { type: Number, default: 0.1 },
  fontSizeMin: { type: Number, default: 1 },
  fontSizeMax: { type: Number, default: 50 },
  multiline: { type: Boolean, default: false },
  rows: { type: Number, default: 4 },
  show: { type: Boolean, default: undefined },
  padding: { type: Object, default: null },
})

defineEmits(['update:modelValue', 'update:fontSize', 'update:show', 'update:padding'])

const showPadding = ref(false)
</script>
