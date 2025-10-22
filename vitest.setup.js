import { beforeAll, afterAll, vi } from "vitest";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, fab); // Adds ALL the solid and brand font awesome icons.

beforeAll(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
})
afterAll(() => {
    vi.restoreAllMocks();
});