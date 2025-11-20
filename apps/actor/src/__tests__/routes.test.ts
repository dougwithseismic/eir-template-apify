import { describe, expect,it } from 'vitest';

import { router } from '../routes.js';

describe('Playwright Router', () => {
    it('should be defined', () => {
        expect(router).toBeDefined();
    });

    it('should be a router instance', () => {
        expect(router).toBeTruthy();
        expect(typeof router).toBe('function');
    });

    it('should have router methods', () => {
        expect(router).toHaveProperty('addDefaultHandler');
        expect(router).toHaveProperty('addHandler');
    });
});
