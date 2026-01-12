import { useState, useDebugValue, useEffect } from 'react';

// Custom Hook
function useOnlineStatus() {
    const [isOnline, setIsOnline] = useState(true);

    // This label shows up next to "useOnlineStatus" in React DevTools
    // e.g. "useOnlineStatus: Online"
    useDebugValue(isOnline ? 'Online' : 'Offline');

    return isOnline;
}

const UseDebugValueDemo = () => {
    const isOnline = useOnlineStatus();

    return (
        <div className="space-y-6">
            <div className="p-6 bg-white border border-gray-200 rounded-lg text-center">
                <h3 className="text-lg font-semibold mb-2">Simulated DevTools</h3>
                <p className="text-gray-500 mb-6 text-sm">
                    This hook doesn&apos;t affect the UI directly. It adds a label to React DevTools.
                    <br />
                    Open F12 &gt; Components to see <code>useOnlineStatus: &quot;Online&quot;</code>.
                </p>

                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    <span className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {isOnline ? 'System Online' : 'System Offline (Mock)'}
                </div>
            </div>
        </div>
    );
};

export default UseDebugValueDemo;
