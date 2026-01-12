import { useState, useTransition } from 'react';

const generateLargeList = (filter) => {
    const list = [];
    for (let i = 0; i < 10000; i++) {
        if (!filter || `Item ${i}`.includes(filter)) {
            list.push(`Item ${i}`);
        }
    }
    return list;
};

const UseTransitionDemo = () => {
    const [input, setInput] = useState('');
    const [list, setList] = useState(generateLargeList(''));
    const [isPending, startTransition] = useTransition();

    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value);

        // Urgent update: setInput (typing feels fast)
        // Low priority update: filtering list (feels non-blocking)
        startTransition(() => {
            setList(generateLargeList(value));
        });
    };

    return (
        <div className="space-y-4">
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Filter List (10,000 items)
                </label>
                <input
                    type="text"
                    value={input}
                    onChange={handleChange}
                    placeholder="Type to filter..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                    Status:
                    {isPending ? (
                        <span className="text-amber-600 font-semibold flex items-center gap-1">
                            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                            Rendering...
                        </span>
                    ) : (
                        <span className="text-green-600 font-semibold">Idle</span>
                    )}
                </div>
            </div>

            <div className="h-64 overflow-y-auto border border-gray-200 rounded-lg bg-gray-50 p-2">
                {list.map((item, index) => (
                    <div key={index} className="p-2 border-b border-gray-100 last:border-0 text-sm text-gray-600">
                        {item}
                    </div>
                ))}
                {list.length === 0 && (
                    <div className="text-center text-gray-400 py-10">No items found</div>
                )}
            </div>
        </div>
    );
};

export default UseTransitionDemo;
