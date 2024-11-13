<script setup lang="ts">
import { defineEmits } from 'vue'

defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <textarea
    :value="modelValue"
    @input="e => emit('update:modelValue', (e.target as HTMLTextAreaElement).value)"
    placeholder="Paste your text here..."
    rows="8"
    class="text-input"
  ></textarea>
</template>

<style scoped>
.text-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  margin-bottom: 1.5rem;
  transition: border-color 0.2s;
}

.text-input:focus {
  outline: none;
  border-color: #4299e1;
}
</style>