export function simplifyText(text: string): string {
  if (!text.trim()) return '';

  // Split text into sentences
  const sentences = text.split(/([.!?]+)/).filter(s => s.trim());

  // Process each sentence
  const simplifiedSentences = sentences.map(sentence => {
    // Remove complex punctuation except basic ones
    let simplified = sentence.replace(/[;:]/g, '.');
    
    // Replace complex words with simpler alternatives
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

    // Replace complex words
    Object.entries(wordReplacements).forEach(([complex, simple]) => {
      const regex = new RegExp(`\\b${complex}\\b`, 'gi');
      simplified = simplified.replace(regex, simple);
    });

    return simplified;
  });

  // Join sentences back together
  return simplifiedSentences.join(' ').trim();
}