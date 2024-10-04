import { defineConfig } from 'vite';
import EnvironmentPlugin from "vite-plugin-environment";
import * as process from "node:process";

// https://vitejs.dev/config
export default defineConfig({
    plugins: [
        EnvironmentPlugin({
            __dirname: process.cwd(),
        })
    ],
    build: {
        rollupOptions: {
            external: ['better-sqlite3']
        }
    }
});
