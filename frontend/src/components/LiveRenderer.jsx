import React from "react";
import {
    LiveProvider,
    LiveEditor,
    LiveError,
    LivePreview
} from "react-live";
import * as LucideIcons from "lucide-react";

const LiveRenderer = ({ code, scope = {} }) => {
    const [refreshKey, setRefreshKey] = React.useState(0);
    const [split, setSplit] = React.useState(50);
    const [isDragging, setIsDragging] = React.useState(false);
    const containerRef = React.useRef(null);

    const defaultScope = {
        React,
        ...React,
        ...LucideIcons,
        ...scope
    };

    React.useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging || !containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = (x / rect.width) * 100;

            // Limit between 20% and 80%
            if (percentage >= 20 && percentage <= 80) {
                setSplit(percentage);
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.body.style.cursor = 'default';
            document.body.style.userSelect = 'auto';
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'default';
            document.body.style.userSelect = 'auto';
        };
    }, [isDragging]);

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden my-6">
            {/* Refresh Header */}
            <div className="flex justify-between items-center px-4 py-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <span className="text-xs text-gray-500">Live Preview & Editor</span>

                <button
                    onClick={() => setRefreshKey(k => k + 1)}
                    className="text-xs px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    Refresh
                </button>
            </div>

            <LiveProvider
                key={refreshKey}
                code={code}
                scope={defaultScope}
                noInline={true}
            >
                <div
                    ref={containerRef}
                    className="flex flex-col md:flex-row relative"
                    style={{ '--split': `${split}%` }}
                >
                    {/* Preview Pane */}
                    <div className="w-full md:w-[var(--split)] flex flex-col min-h-[300px]">
                        <div className="flex-1 p-6 bg-white dark:bg-gray-800 flex items-center justify-center overflow-auto">
                            <LivePreview />
                        </div>
                    </div>

                    {/* Drag Handle */}
                    <div
                        onMouseDown={() => setIsDragging(true)}
                        className="hidden md:flex w-2 bg-gray-100 dark:bg-gray-900 cursor-col-resize hover:bg-indigo-500 hover:scale-x-150 transition-all items-center justify-center z-10 border-x border-gray-200 dark:border-gray-800"
                        title="Drag to resize"
                    >
                        <div className="w-0.5 h-8 bg-gray-300 dark:bg-gray-600 rounded-full" />
                    </div>

                    {/* Editor Pane */}
                    <div className="flex-1 bg-gray-900 overflow-hidden flex flex-col min-h-[300px]">
                        <div className="px-4 py-2 bg-gray-950 text-gray-400 text-xs font-mono border-b border-gray-800 flex justify-between">
                            <span>Editor</span>
                            <span className="text-gray-600">Editable</span>
                        </div>

                        <div className="flex-1 overflow-auto max-h-[500px]">
                            <LiveEditor
                                className="font-mono text-sm bg-gray-900!"
                                style={{
                                    fontFamily: '"Fira Code", monospace',
                                    fontSize: 14,
                                    minHeight: '100%'
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-red-900/20 text-red-500 p-2 text-xs font-mono border-t border-red-900/10">
                    <LiveError />
                </div>
            </LiveProvider>
        </div>
    );
};

export default LiveRenderer;
