import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import IconNotification from '../icon-notification';

describe('IconNotification', () => {
    it('renders notification icon', () => {
        render(<IconNotification />);

        const notificationIcon = screen.getByRole('img');
        expect(notificationIcon).toBeInTheDocument();
    });
});
