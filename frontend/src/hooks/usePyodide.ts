import { useState, useEffect, useRef } from 'react';
import { loadPyodide, PyodideInterface } from 'pyodide';

export const usePyodide = () => {
    const [pyodide, setPyodide] = useState<PyodideInterface | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [output, setOutput] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const initializationPromise = useRef<Promise<void> | null>(null);

    useEffect(() => {
        const initPyodide = async () => {
            try {
                // Prevent double initialization
                if (initializationPromise.current) {
                    await initializationPromise.current;
                    return;
                }

                initializationPromise.current = (async () => {
                    const pyodideInstance = await loadPyodide({
                        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/" // Using CDN for zero-config assets
                    });
                    setPyodide(pyodideInstance);
                    setIsLoading(false);
                })();

                await initializationPromise.current;
            } catch (err) {
                console.error("Failed to load Pyodide:", err);
                setError("Failed to load Python environment.");
                setIsLoading(false);
            }
        };

        if (!pyodide) {
            initPyodide();
        }
    }, []);

    const runPython = async (code: string) => {
        if (!pyodide) {
            setError("Python environment not ready.");
            return;
        }

        setOutput([]);
        setError(null);

        try {
            // Capture stdout
            pyodide.setStdout({ batched: (msg: string) => setOutput((prev) => [...prev, msg]) });

            await pyodide.runPythonAsync(code);

        } catch (err: any) {
            console.error(err);
            setError(err.message || "An error occurred");
        }
    };

    return { runPython, isLoading, output, error, resetOutput: () => setOutput([]) };
};
