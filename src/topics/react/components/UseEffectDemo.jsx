 
import { useState, useEffect } from 'react';

const UseEffectDemo = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshIndex, setRefreshIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Simulating network delay for better demo experience
                await new Promise(resolve => setTimeout(resolve, 800));

                const response = await fetch('https://dummyjson.com/products/1');
                if (!response.ok) throw new Error('Network response was not ok');

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [refreshIndex]); // Re-run effect when refreshIndex changes

    const handleRefresh = () => {
        setRefreshIndex(prev => prev + 1);
    };

    return (
        <div className="space-y-6">
            <div className="p-6 bg-white border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Data Fetching Example</h3>
                    <button
                        onClick={handleRefresh}
                        className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100 transition-colors"
                    >
                        Refresh Data
                    </button>
                </div>

                <p className="text-gray-600 mb-6 text-sm">
                    This component uses <code>useEffect</code> to fetch product data from <code>dummyjson.com</code> on mount (and on refresh).
                </p>

                {loading && (
                    <div className="flex justify-center items-center py-12 text-gray-400 animate-pulse">
                        Loading API Data...
                    </div>
                )}

                {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded">
                        Error: {error}
                    </div>
                )}

                {!loading && !error && data && (
                    <div className="flex gap-4 p-4 border rounded bg-gray-50">
                        <div className="w-24 h-24 shrink-0 bg-white rounded border flex items-center justify-center overflow-hidden">
                            {data.thumbnail ? (
                                <img src={data.thumbnail} alt={data.title} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-xs text-gray-400">No Img</span>
                            )}
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">{data.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{data.description}</p>
                            <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-bold">
                                ${data.price}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UseEffectDemo;
