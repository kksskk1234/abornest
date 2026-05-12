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
})

defineEmits(['update:modelValue', 'update:fontSize', 'update:show'])
</script>
