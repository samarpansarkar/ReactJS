import { useState } from "react";

export default function LazyLoadDemo() {
    const [show, setShow] = useState(false);

    return (
        <div className="space-y-3">
            <button
                onClick={() => setShow(!show)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
                {show ? 'Hide' : 'Load'} Component
            </button>
            {show && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="font-bold text-yellow-900">Component Loaded!</p>
                    <p className="text-sm text-yellow-700">This was loaded on demand</p>
                </div>
            )}
        </div>
    );
}