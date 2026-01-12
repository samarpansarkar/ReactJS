import { useState, useContext, createContext, memo } from 'react';

// Contexts
const UserContext = createContext();
const ThemeContext = createContext();

// Child Components
const UserDisplay = memo(() => {
    console.log('UserDisplay rendered');
    const { user } = useContext(UserContext);
    return (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <h4 className="font-bold text-blue-900">User Display</h4>
            <p>Current User: {user}</p>
            <span className="text-xs text-gray-500">Rendered at: {new Date().toLocaleTimeString()}</span>
        </div>
    );
});

const ThemeDisplay = memo(() => {
    console.log('ThemeDisplay rendered');
    const { theme } = useContext(ThemeContext);
    return (
        <div className={`p-4 border rounded ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-yellow-50 text-yellow-900'}`}>
            <h4 className="font-bold">Theme Display</h4>
            <p>Current Theme: {theme}</p>
            <span className="text-xs opacity-70">Rendered at: {new Date().toLocaleTimeString()}</span>
        </div>
    );
});

const ContextOptimizationDemo = () => {
    const [user, setUser] = useState('Guest');
    const [theme, setTheme] = useState('light');

    return (
        <div className="space-y-6">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h3 className="font-bold mb-4">Control Panel</h3>
                <div className="flex gap-4">
                    <button
                        onClick={() => setUser(u => u === 'Guest' ? 'Admin' : 'Guest')}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Toggle User
                    </button>
                    <button
                        onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
                        className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
                    >
                        Toggle Theme
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {/* We separate Providers to avoid updates spreading if they were in a single object */}
                <UserContext.Provider value={{ user, setUser }}>
                    <UserDisplay />
                </UserContext.Provider>

                <ThemeContext.Provider value={{ theme, setTheme }}>
                    <ThemeDisplay />
                </ThemeContext.Provider>
            </div>

            <div className="text-sm text-gray-600 bg-white p-4 border rounded">
                <strong>Observation:</strong> Open the console. Clicking "Toggle User" will ONLY re-render the UserDisplay.
                Clicking "Toggle Theme" will ONLY re-render the ThemeDisplay.
                <br /><br />
                If we stored both in a single `GlobalContext` like `value={{ user, theme }}`, BOTH components would re-render on ANY change.
            </div>
        </div>
    );
};

export default ContextOptimizationDemo;
