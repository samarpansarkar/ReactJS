 
import { useState } from 'react';

const UseStateDemo = () => {
    const [count, setCount] = useState(0);

    return (
        <div className="space-y-6">
            <div className="p-6 bg-white border border-gray-200 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-4">Counter Example</h3>
                <p className="text-gray-600 mb-6">
                    This component tracks a <code>count</code> value using <code>useState</code>.
                    Clicking buttons updates the state and triggers a re-render.
                </p>

                <div className="flex flex-col items-center gap-4">
                    <div className="text-5xl font-mono font-bold text-indigo-600">
                        {count}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setCount(c => c - 1)}
                            className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                        >
                            Decrease
                        </button>
                        <button
                            onClick={() => setCount(0)}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                        >
                            Reset
                        </button>
                        <button
                            onClick={() => setCount(c => c + 1)}
                            className="px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                        >
                            Increase
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UseStateDemo;
