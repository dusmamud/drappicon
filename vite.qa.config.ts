import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// QA-only build: compiles the harness page (qa.html) into dist-qa/.
// Never used for the product build.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-qa',
    rollupOptions: {
      input: { qa: 'qa.html' },
    },
  },
})
