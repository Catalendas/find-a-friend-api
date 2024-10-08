import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsConfigPaths()],
    test: {
        environmentMatchGlobs: [
            ['src/http/controllers/**', 'prisma/vitest-environments-prisma'],
        ],
        hookTimeout: 20000,
        dir: 'src',
        globals: true,
        coverage: {
            all: false
        }
    }
})