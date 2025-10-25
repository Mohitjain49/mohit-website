import { beforeAll, afterAll, vi } from "vitest";

beforeAll(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
})
afterAll(() => {
    vi.restoreAllMocks();
});