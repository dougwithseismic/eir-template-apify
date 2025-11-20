import { defineConfig, mergeConfig } from 'vitest/config';
import baseConfig from '@repo/vitest-config/node';

export default mergeConfig(
    baseConfig,
    defineConfig({
        test: {
            // Add actor-specific test configuration here
            globals: true,
            mockReset: true,
            restoreMocks: true,
        },
    })
);
