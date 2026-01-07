import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock react-syntax-highlighter to avoid ESM import issues in tests
vi.mock('react-syntax-highlighter', () => ({
    Prism: ({ children }: any) => children,
    PrismLight: ({ children }: any) => children,
}));

vi.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
    vscDarkPlus: {},
}));

// Mock Pyodide hook to prevent hanging tests
vi.mock('@/hooks/usePyodide', () => ({
    usePyodide: () => ({
        runPython: vi.fn().mockResolvedValue(''),
        resetOutput: vi.fn(),
        output: '',
        isLoading: false,
        error: null,
    }),
}));
