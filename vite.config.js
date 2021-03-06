import { defineConfig, loadEnv } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import viteCompression from 'vite-plugin-compression';


// https://vitejs.dev/config/
export default ({ mode }) => {
    return defineConfig({
        plugins: [
            svelte({
                preprocess: sveltePreprocess({
                    sourceMap: true,
                    postcss: {
                        plugins: [
                            require('postcss-nested')(),
                            require('postcss-calc')(),
                            require('postcss-preset-env')({ stage: 2 }),
                            require('autoprefixer')()
                        ]
                    }
                })
            }),
            viteCompression({ algorithm: 'brotliCompress', ext: '.br' })
        ],
        server: {
            hmr: {
                port: 443,
            }
        }
    })
}