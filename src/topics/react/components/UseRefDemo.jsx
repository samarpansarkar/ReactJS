/* eslint-disable */
import { useState, useRef, useEffect } from 'react';

const UseRefDemo = () => {
    const [count, setCount] = useState(0);
    const renderCount = useRef(0);
    const inputRef = useRef(null);

    useEffect(() => {
        renderCount.current = renderCount.current + 1;
    });

    const focusInput = () => {
        inputRef.current.focus();
    };

    return (
        <div className="space-y-6">
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <h3 className="font-bold mb-4">Render Tracking</h3>
                <p className="mb-4">
                    State: {count} <br />
                    <span className="text-sm text-gray-500">
                        (Clicking this causes re-render)
                    </span>
                </p>
                <button
                    onClick={() => setCount(c => c + 1)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
                >
                    Increment State
                </button>

                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-yellow-800">
                    <strong>Total Renders: {renderCount.current}</strong>
                    <p className="text-xs mt-1">
                        We use <code>useRef</code> to track renders because updating a ref doesn&apos;t trigger a re-render loop!
                    </p>
                </div>
            </div>

            <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <h3 className="font-bold mb-4">DOM Access</h3>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="I am controlled by ref"
                    className="border p-2 rounded mr-2"
                />
                <button
                    onClick={focusInput}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Focus Input
                </button>
            </div>
        </div>
    );
};

export default UseRefDemo;
