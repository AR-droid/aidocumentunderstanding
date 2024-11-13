<script setup lang="ts">
import { ref } from 'vue'

const inputText = ref('')
const wordCount = ref(0)
const charCount = ref(0)
const sentenceCount = ref(0)
const avgWordLength = ref(0)
const commonWords = ref<[string, number][]>([])
const simplifiedContent = ref('')

function simplifyText(text: string): string {
  if (!text.trim()) return '';
  
  const sentences = text.split(/([.!?]+)/).filter(s => s.trim());
  
  const wordReplacements: Record<string, string> = {
    'utilize': 'use',
    'implement': 'use',
    'facilitate': 'help',
    'commence': 'start',
    'terminate': 'end',
    'subsequently': 'then',
    'nevertheless': 'however',
    'approximately': 'about',
    'sufficient': 'enough',
    'demonstrate': 'show',
    'obtain': 'get',
    'regarding': 'about',
    'numerous': 'many',
    'additional': 'more',
    'assist': 'help',
    'require': 'need',
    'purchase': 'buy',
    'receive': 'get',
    'comprehend': 'understand',
    'inquire': 'ask'
  };

  const simplifiedSentences = sentences.map(sentence => {
    let simplified = sentence.replace(/[;:]/g, '.');
    
    Object.entries(wordReplacements).forEach(([complex, simple]) => {
      const regex = new RegExp(`\\b${complex}\\b`, 'gi');
      simplified = simplified.replace(regex, simple);
    });

    return simplified;
  });

  return simplifiedSentences.join(' ').trim();
}

function analyzeText() {
  const text = inputText.value.trim()
  
  if (!text) {
    resetStats()
    return
  }

  const words = text.toLowerCase().match(/\b\w+\b/g) || []
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  
  const wordFreq = new Map<string, number>()
  words.forEach(word => wordFreq.set(word, (wordFreq.get(word) || 0) + 1))

  wordCount.value = words.length
  charCount.value = text.length
  sentenceCount.value = sentences.length
  avgWordLength.value = words.length ? words.reduce((sum, word) => sum + word.length, 0) / words.length : 0
  commonWords.value = Array.from(wordFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    
  simplifiedContent.value = simplifyText(text)
}

function resetStats() {
  wordCount.value = 0
  charCount.value = 0
  sentenceCount.value = 0
  avgWordLength.value = 0
  commonWords.value = []
  simplifiedContent.value = ''
}
</script>

<template>
  <main>
    <div class="analyzer">
      <h1>Document Analyzer</h1>
      
      <textarea
        v-model="inputText"
        @input="analyzeText"
        placeholder="Paste your text here..."
        rows="8"
        class="text-input"
      ></textarea>

      <div v-if="wordCount > 0" class="stats">
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

      <div class="results" v-if="wordCount > 0">
        <div class="common-words">
          <h2>Common Words</h2>
          <ul>
            <li v-for="[word, count] in commonWords" :key="word">
              <span class="word">{{ word }}</span>
              <span class="count">{{ count }}</span>
            </li>
          </ul>
        </div>

        <div class="simplified-text">
          <h2>Simplified Text</h2>
          <div class="text-content">{{ simplifiedContent }}</div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color: #213547;
  background-color: #ffffff;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

#app {
  width: 100%;
  margin: 0 auto;
}

main {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 2rem;
  background: #f5f5f5;
}

.analyzer {
  width: 100%;
  max-width: 800px;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  margin: 0 0 1.5rem;
  color: #2c3e50;
  font-size: 1.8rem;
  text-align: center;
}

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

.results {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.common-words, .simplified-text {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 8px;
}

.common-words h2, .simplified-text h2 {
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

.text-content {
  line-height: 1.6;
  color: #4a5568;
  white-space: pre-wrap;
}

@media (max-width: 640px) {
  main {
    padding: 1rem;
  }
  
  .analyzer {
    padding: 1rem;
  }
  
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>