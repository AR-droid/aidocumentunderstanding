<script setup lang="ts">
defineProps<{
  wordCount: number
  charCount: number
  sentenceCount: number
  avgWordLength: number
}>()
</script>

<template>
  <div class="stats">
    <div class="stat-box">
      <span class="label">Words</span>
      <span class="value">{{ wordCount }}</span>
    </div>
    <div class="stat-box">
      <span class="label">Characters</span>
      <span class="value">{{ charCount }}</span>
    </div>
    <div class="stat-box">
      <span class="label">Sentences</span>
      <span class="value">{{ sentenceCount }}</span>
    </div>
    <div class="stat-box">
      <span class="label">Avg Word Length</span>
      <span class="value">{{ avgWordLength.toFixed(1) }}</span>
    </div>
  </div>
</template>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-box {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.label {
  color: #64748b;
  font-size: 0.875rem;
}

.value {
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 600;
}

@media (max-width: 640px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>