// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	redirects: {
		'/': '/about',
		'/sobre': '/about',
		'/andres': '/about',
		'/andres-ramos': '/about',
		'/data': '/privacy',
		'/notas': '/posts',
		'/blog': '/posts',
	},
});
