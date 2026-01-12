/* eslint-disable */
import { useInsertionEffect, useEffect, useState, useLayoutEffect } from 'react';

const UseInsertionEffectDemo = () => {
    const [logs, setLogs] = useState([]);

    const addLog = (msg) => {
        // We use a functional update to avoid dependency cycles for this demo
        setLogs(prev => [...prev, `${new Date().toLocaleTimeString().split(' ')[0]}: ${msg}`]);
        console.log(msg);
    };

    useInsertionEffect(() => {
        // This runs BEFORE DOM mutations. 
        // You cannot access refs here reliably.
        // It's strictly for injecting dynamic CSS (like styled-components).
        console.log('1. useInsertionEffect running (Inject styles here)');
    }, []);

    useLayoutEffect(() => {
        console.log('2. useLayoutEffect running (Read layout here)');
    }, []);

    useEffect(() => {
        console.log('3. useEffect running (Passive effects here)');
    }, []);

    return (
        <div className="space-y-6">
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <h3 className="font-bold mb-4">Execution Order Demo</h3>
                <p className="text-gray-600 mb-4">
                    <code>useInsertionEffect</code> is for CSS-in-JS libraries. It runs <em>before</em> DOM mutations to inject styles, ensuring no layout thrashing.
                </p>
                <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
                    <div className="text-gray-400 mb-2">// Console Output Order:</div>
                    <div className="text-green-400">1. useInsertionEffect running</div>
                    <div className="text-blue-400">2. useLayoutEffect running</div>
                    <div className="text-yellow-400">3. useEffect running</div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    *Open browser console (F12) to verify the order yourself.
                </p>
            </div>
        </div>
    );
};

export default UseInsertionEffectDemo;
