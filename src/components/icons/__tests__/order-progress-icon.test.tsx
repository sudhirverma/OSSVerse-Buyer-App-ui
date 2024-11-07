import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import OrderProgressIcon from '../order-progress-icon';

describe('OrderProgressIcon', () => {
    it('should render the icon with correct attributes', () => {
        const { getByRole } = render(<OrderProgressIcon />);
        const icon = getByRole('img');

        expect(icon).toHaveAttribute('width', '20');
        expect(icon).toHaveAttribute('height', '20');
        expect(icon).toHaveAttribute('viewBox', '0 0 20 20');
        expect(icon).toHaveAttribute('fill', 'none');
        expect(icon).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    });

    it('should have the correct title', () => {
        const { getByTitle } = render(<OrderProgressIcon />);
        const title = getByTitle('Order Progress');

        expect(title).toBeInTheDocument();
    });
});
