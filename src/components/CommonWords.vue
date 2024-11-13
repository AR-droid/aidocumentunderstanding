<script setup lang="ts">
defineProps<{
  words: [string, number][]
}>()
</script>

<template>
  <div class="common-words">
    <h2>Common Words</h2>
    <ul>
      <li v-for="[word, count] in words" :key="word">
        <span class="word">{{ word }}</span>
        <span class="count">{{ count }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.common-words {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 8px;
}

.common-words h2 {
  margin: 0 0 1rem;
  font-size: 1.2rem;
  color: #2c3e50;
}

.common-words ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.common-words li {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.common-words li:last-child {
  border-bottom: none;
}

.word {
  color: #2c3e50;
}

.count {
  color: #64748b;
  font-weight: 500;
}
</style>