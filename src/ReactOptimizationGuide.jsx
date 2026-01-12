import { useState, useMemo, useCallback, memo, lazy, Suspense } from 'react';
import { ChevronDown, ChevronUp, Code, Zap, Users, Package } from 'lucide-react';

// 1. React.memo - Prevents re-renders when props haven't changed
const ExpensiveChildComponent = memo(({ name, count }) => {
    console.log(`${name} rendered!`);
    return (
        <div className="p-3 bg-blue-50 rounded border border-blue-200">
            <p className="font-semibold text-blue-900">{name}</p>
            <p className="text-blue-700">Count: {count}</p>
        </div>
    );
});

// 2. useMemo - Memoize expensive calculations
function UseMemoExample() {
    const [count, setCount] = useState(0);
    const [items] = useState(Array.from({ length: 1000 }, (_, i) => i));

    // Without useMemo, this runs on every render
    const expensiveCalculation = useMemo(() => {
        console.log('Calculating sum...');
        return items.reduce((sum, item) => sum + item, 0);
    }, [items]);

    return (
        <div className="space-y-3">
            <p className="text-sm text-gray-600">Count: {count}</p>
            <p className="text-sm text-gray-600">Sum of 1000 items: {expensiveCalculation}</p>
            <button
                onClick={() => setCount(count + 1)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Increment (Check Console)
            </button>
        </div>
    );
}

// 3. useCallback - Memoize callback functions
function UseCallbackExample() {
    const [count, setCount] = useState(0);
    const [other, setOther] = useState(0);

    // Without useCallback, this creates a new function on every render
    const handleClick = useCallback(() => {
        console.log('Button clicked!', count);
    }, [count]);

    return (
        <div className="space-y-3">
            <ExpensiveChildComponent name="Memoized Child" count={count} />
            <div className="flex gap-2">
                <button
                    onClick={() => setCount(count + 1)}
                    className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                >
                    Update Count
                </button>
                <button
                    onClick={() => setOther(other + 1)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Update Other ({other})
                </button>
            </div>
        </div>
    );
}

// 4. Code Splitting with lazy loading
const HeavyComponent = lazy(() =>
    Promise.resolve({
        default: () => (
            <div className="p-4 bg-yellow-50 rounded border border-yellow-200">
                <h3 className="font-bold text-yellow-900">Heavy Component Loaded!</h3>
                <p className="text-yellow-700">This was loaded on demand.</p>
            </div>
        )
    })
);

function LazyLoadExample() {
    const [show, setShow] = useState(false);

    return (
        <div className="space-y-3">
            <button
                onClick={() => setShow(!show)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
                {show ? 'Hide' : 'Load'} Heavy Component
            </button>
            {show && (
                <Suspense fallback={<div className="text-gray-500">Loading...</div>}>
                    <HeavyComponent />
                </Suspense>
            )}
        </div>
    );
}

// 5. Virtualization example concept
function VirtualizationExample() {
    const [items] = useState(Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`));
    const [visibleStart, setVisibleStart] = useState(0);
    const itemsPerPage = 20;

    const visibleItems = items.slice(visibleStart, visibleStart + itemsPerPage);

    return (
        <div className="space-y-3">
            <p className="text-sm text-gray-600">
                Showing {visibleStart + 1}-{Math.min(visibleStart + itemsPerPage, items.length)} of {items.length}
            </p>
            <div className="h-64 overflow-auto border border-gray-300 rounded p-2">
                {visibleItems.map((item, idx) => (
                    <div key={visibleStart + idx} className="p-2 border-b border-gray-200">
                        {item}
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => setVisibleStart(Math.max(0, visibleStart - itemsPerPage))}
                    disabled={visibleStart === 0}
                    className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => setVisibleStart(Math.min(items.length - itemsPerPage, visibleStart + itemsPerPage))}
                    disabled={visibleStart + itemsPerPage >= items.length}
                    className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

// Main component
export default function ReactOptimizationGuide() {
    const [activeSection, setActiveSection] = useState(null);

    const sections = [
        {
            id: 'memo',
            icon: Users,
            title: 'React.memo',
            description: 'Prevent unnecessary re-renders of child components',
            component: UseCallbackExample,
            tips: [
                'Use for components that render often with same props',
                'Compare props shallowly by default',
                'Custom comparison function for deep equality'
            ]
        },
        {
            id: 'useMemo',
            icon: Zap,
            title: 'useMemo',
            description: 'Cache expensive calculations between renders',
            component: UseMemoExample,
            tips: [
                'Only for expensive computations',
                'Dependency array controls when to recalculate',
                "Don't overuse - has its own overhead"
            ]
        },
        {
            id: 'useCallback',
            icon: Code,
            title: 'useCallback',
            description: 'Memoize callback functions to prevent child re-renders',
            component: UseCallbackExample,
            tips: [
                'Useful when passing callbacks to memoized children',
                'Prevents new function creation on each render',
                'Must include dependencies in array'
            ]
        },
        {
            id: 'lazy',
            icon: Package,
            title: 'Code Splitting & Lazy Loading',
            description: 'Load components only when needed',
            component: LazyLoadExample,
            tips: [
                'Reduces initial bundle size',
                'Use React.lazy() and Suspense',
                'Great for route-based splitting'
            ]
        },
        {
            id: 'virtualization',
            icon: Package,
            title: 'List Virtualization',
            description: 'Render only visible items in large lists',
            component: VirtualizationExample,
            tips: [
                'Essential for lists with 100+ items',
                'Libraries: react-window, react-virtualized',
                'Dramatically improves performance'
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        React Optimization Techniques
                    </h1>
                    <p className="text-gray-600">
                        Learn essential patterns to make your React apps faster
                    </p>
                </div>

                <div className="space-y-4">
                    {sections.map((section) => {
                        const Icon = section.icon;
                        const isActive = activeSection === section.id;
                        const Component = section.component;

                        return (
                            <div
                                key={section.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden"
                            >
                                <button
                                    onClick={() => setActiveSection(isActive ? null : section.id)}
                                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className="w-6 h-6 text-indigo-600" />
                                        <div className="text-left">
                                            <h3 className="font-semibold text-gray-900">{section.title}</h3>
                                            <p className="text-sm text-gray-600">{section.description}</p>
                                        </div>
                                    </div>
                                    {isActive ? (
                                        <ChevronUp className="w-5 h-5 text-gray-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                    )}
                                </button>

                                {isActive && (
                                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                                        <div className="mb-4">
                                            <h4 className="font-semibold text-gray-900 mb-2">Try it:</h4>
                                            <div className="bg-white p-4 rounded border border-gray-200">
                                                <Component />
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">💡 Tips:</h4>
                                            <ul className="space-y-1">
                                                {section.tips.map((tip, idx) => (
                                                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                                        <span className="text-indigo-600 mt-1">•</span>
                                                        <span>{tip}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-bold text-gray-900 mb-3">Additional Best Practices:</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span><strong>Use key prop correctly:</strong> Stable, unique keys help React identify which items changed</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span><strong>Avoid inline functions:</strong> Define handlers outside JSX or use useCallback</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span><strong>Debounce/Throttle:</strong> Limit expensive operations on frequent events (scroll, input)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span><strong>Use React DevTools Profiler:</strong> Measure before optimizing - don't guess!</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span><strong>State colocation:</strong> Keep state as close to where it's used as possible</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
