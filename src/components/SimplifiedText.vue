<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <div class="simplified-text">
    <h2>Simplified Text</h2>
    <div class="text-content">{{ text }}</div>
  </div>
</template>

<style scoped>
.simplified-text {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1.5rem;
}

.simplified-text h2 {
  margin: 0 0 1rem;
  font-size: 1.2rem;
  color: #2c3e50;
}

.text-content {
  line-height: 1.6;
  color: #4a5568;
  white-space: pre-wrap;
}
</style>