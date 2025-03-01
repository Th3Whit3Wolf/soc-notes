// @ts-check
import solidJs from '@astrojs/solid-js';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import Icons from 'unplugin-icons/vite';

// https://astro.build/config
export default defineConfig({
    site: process.env.CI
        ? 'https://th3whit3wolf.github.io'
        : 'http://localhost:4321',
    base: '/soc-notes',
    integrations: [
        solidJs(),
        starlight({
            title: 'SOC Notes',
            social: {
                github: 'https://github.com/th3whit3wolf/soc-notes',
            },
            components: {
                Head: "./src/components/starlight/Head.astro",
            },
            sidebar: [
                {
                    label: "CLI Tools",
                    autogenerate: { directory: 'CLI' }
                },
                {
                    label: "Tools",
                    autogenerate: { directory: 'Tools' },
                },
                {
                    label: "Digital Forensic and Incident Response",
                    autogenerate: { directory: "DFIR" }
                },
                {
                    label: "Uncategorized",
                    autogenerate: { directory: "Uncategorized" }
                }
            ],
            customCss: ['./src/tailwind.css'],
            expressiveCode: {
                styleOverrides: { borderRadius: '0.5rem' },
                themes: ['one-dark-pro', 'one-light', 'github-dark'],
            },

        }), tailwind({ applyBaseStyles: false }), solidJs()],
    vite: {
        plugins: [Icons({ compiler: 'astro' })],
    },
});