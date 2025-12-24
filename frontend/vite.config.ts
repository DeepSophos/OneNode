import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
export default defineConfig({
	server: {
		proxy: {
		  '^/rag/api/v1/.*': {
			target: 'http://127.0.0.1:8080',
			changeOrigin: true,
		  },
		  '^/agents/api/v1/.*': {
			target: 'http://127.0.0.1:8080',
			changeOrigin: true,
		  }
		},
	  },
	plugins: [sveltekit(), UnoCSS()],
	define: {
		APP_VERSION: JSON.stringify(process.env.npm_package_version)
	},
	worker: {
		format: 'es'
	},
	optimizeDeps: {
    include: ['dompurify']
  }
});
