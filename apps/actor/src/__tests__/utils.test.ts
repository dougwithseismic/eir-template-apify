import { describe, expect,it } from 'vitest';

describe('Utility Functions', () => {
    describe('URL validation', () => {
        it('should validate correct URLs', () => {
            const validUrls = [
                'https://apify.com',
                'https://apify.com/store',
                'http://example.com',
            ];

            validUrls.forEach(url => {
                const parsed = new URL(url);
                expect(parsed).toBeDefined();
                expect(parsed.protocol).toMatch(/^https?:$/);
            });
        });

        it('should reject invalid URLs', () => {
            // URL constructor throws TypeError for invalid URLs
            expect(() => new URL('not-a-url')).toThrow(TypeError);
            expect(() => new URL('://invalid')).toThrow(TypeError);
            expect(() => new URL('ht!tp://invalid.com')).toThrow(TypeError);
        });

        it('should parse URL components correctly', () => {
            const url = new URL('https://apify.com/store?page=1');
            expect(url.protocol).toBe('https:');
            expect(url.hostname).toBe('apify.com');
            expect(url.pathname).toBe('/store');
            expect(url.searchParams.get('page')).toBe('1');
        });
    });

    describe('String manipulation', () => {
        it('should trim whitespace from strings', () => {
            expect('  hello  '.trim()).toBe('hello');
            expect('world'.trim()).toBe('world');
        });

        it('should convert strings to lowercase', () => {
            expect('HELLO'.toLowerCase()).toBe('hello');
            expect('WoRlD'.toLowerCase()).toBe('world');
        });
    });

    describe('Array operations', () => {
        it('should filter array elements', () => {
            const numbers = [1, 2, 3, 4, 5];
            const evenNumbers = numbers.filter(n => n % 2 === 0);
            expect(evenNumbers).toEqual([2, 4]);
        });

        it('should map array elements', () => {
            const numbers = [1, 2, 3];
            const doubled = numbers.map(n => n * 2);
            expect(doubled).toEqual([2, 4, 6]);
        });
    });
});
