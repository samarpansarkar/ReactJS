/* eslint-disable */
import { useState, useRef, useLayoutEffect, useEffect } from 'react';

const BoxWithLayoutEffect = ({ onReset }) => {
    const [value, setValue] = useState(0);

    useLayoutEffect(() => {
        if (value === 0) {
            setValue(10 + Math.random() * 200);
        }
    }, [value]);

    return (
        <div
            className="p-12 text-center text-4xl font-bold bg-green-50 text-green-800 rounded-xl border border-green-200"
            style={{ marginTop: '20px' }}
        >
            value: {value}
        </div>
    );
};

const BoxWithUseEffect = ({ onReset }) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (value === 0) {
            setValue(10 + Math.random() * 200);
        }
    }, [value]);

    return (
        <div
            className="p-12 text-center text-4xl font-bold bg-amber-50 text-amber-800 rounded-xl border border-amber-200"
            style={{ marginTop: '20px' }}
        >
            value: {value}
        </div>
    );
};

const UseLayoutEffectDemo = () => {
    const [isLayoutEffect, setIsLayoutEffect] = useState(true);
    const [key, setKey] = useState(0); // Force remount to reset

    const handleReset = () => {
        setKey(k => k + 1);
    };

    return (
        <div className="space-y-6">
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isLayoutEffect}
                            onChange={(e) => setIsLayoutEffect(e.target.checked)}
                            className="w-4 h-4 text-indigo-600"
                        />
                        <span className="font-medium">Use useLayoutEffect</span>
                    </label>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                    Click reset. If <code>useLayoutEffect</code> is ON, you won&apos;t see the initial &apos;0&apos;.
                    If OFF (using <code>useEffect</code>), you might see a flash of &apos;0&apos; before it changes (easier to spot with CPU throttling).
                </p>

                <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                    Reset Value (Remount)
                </button>
            </div>

            {isLayoutEffect ? (
                <BoxWithLayoutEffect key={key} />
            ) : (
                <BoxWithUseEffect key={key} />
            )}
        </div>
    );
};

export default UseLayoutEffectDemo;
