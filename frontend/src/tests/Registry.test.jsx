import { describe, it, expect } from 'vitest';
import { getIcon, iconRegistry } from '../utils/componentRegistry';
import { Box } from 'lucide-react';

describe('Component Registry', () => {
    it('returns correct icon for known key', () => {
        const icon = getIcon('Zap');
        expect(icon).toBe(iconRegistry.Zap);
    });

    it('returns default Box icon for unknown key', () => {
        const icon = getIcon('UnknownIcon');
        expect(icon).toBe(Box);
    });
});
