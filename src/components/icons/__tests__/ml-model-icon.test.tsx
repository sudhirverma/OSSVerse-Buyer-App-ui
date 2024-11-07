import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import MLModelIcon from '../ml-model-icon';

describe('MLModelIcon', () => {
    it('should render the icon with correct attributes', () => {
        const { getByRole } = render(<MLModelIcon />);
        const icon = getByRole('img');


    });

    it('should have the correct title', () => {
        const { getByTitle } = render(<MLModelIcon />);
        const title = getByTitle('ML Model');

        expect(title).toBeInTheDocument();
    });
});
