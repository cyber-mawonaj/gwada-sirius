import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			precompress: false,
			strict: true
		}),
		// GitHub Pages : le site est servi sous /gwada-sirius/
		// relative: false — chemins absolus partout (sinon $app/paths.base vaut ".."
		// au prerender et les comparaisons de pathname se cassent).
		paths: {
			base: '/gwada-sirius',
			relative: false
		},
		prerender: {
			handleHttpError: 'warn',
			handleMissingId: 'warn'
		}
	}
};

export default config;
