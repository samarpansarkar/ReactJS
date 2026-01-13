import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SubjectProvider, useSubjects } from '../context/SubjectContext';
import api from '../api/client';

// Mock API
vi.mock('../api/client');

// Test Component
const TestComponent = () => {
    const { subjects, loading, error } = useSubjects();
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <ul>
            {subjects.map(s => <li key={s.id}>{s.name}</li>)}
        </ul>
    );
};

describe('SubjectContext', () => {
    it('should fetch and display subjects', async () => {
        api.get.mockResolvedValue({
            data: [
                { id: '1', name: 'React', path: '/react' },
                { id: '2', name: 'JavaScript', path: '/js' }
            ]
        });

        render(
            <SubjectProvider>
                <TestComponent />
            </SubjectProvider>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('React')).toBeInTheDocument();
            expect(screen.getByText('JavaScript')).toBeInTheDocument();
        });
    });

    it('should handle errors', async () => {
        api.get.mockRejectedValue(new Error('Failed to fetch'));

        render(
            <SubjectProvider>
                <TestComponent />
            </SubjectProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
        });
    });
});
