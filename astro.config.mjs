import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    site: 'https://r48n34.github.io',
    integrations: [react()],
});
