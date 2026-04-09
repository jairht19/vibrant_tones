import { EventEmitter } from 'events';
import fs from 'fs/promises';

/**
 * A basic service class to demonstrate theme features
 * showcasing syntax highlighting for Vibrant Tones.
 */
class ThemeShowcase extends EventEmitter {
  constructor(options = {}) {
    super();
    this.name = options.name || "Vibrant Tones Theme";
    this.isActive = true;
    this.version = 1.0;
  }

  async loadConfiguration(filePath) {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      const config = JSON.parse(data);
      
      this.emit('loaded', config);
      return config;
    } catch (error) {
      console.error(`Failed to load config: ${error.message}`);
      return null;
    }
  }

  // Calculate some dummy logic to show array mapping and regex
  processItems(items) {
    const multiplier = 42;
    const regexPattern = /[a-z]+_\d/gi;
    
    return items.map((item, index) => {
      let score = index * multiplier;
      
      if (typeof item === 'string' && regexPattern.test(item)) {
        score += 100; // Bonus points
      }
      
      return {
        id: `token_${index}`,
        value: item,
        score: score
      };
    });
  }
}

// Example instantiation and usage
const showcase = new ThemeShowcase({ name: "Demo" });

showcase.on('loaded', (config) => {
  console.log('Configuration successfully applied!', config);
});

export default ThemeShowcase;
