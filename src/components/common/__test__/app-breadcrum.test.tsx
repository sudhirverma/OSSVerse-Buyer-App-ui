import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AppBreadCrumb from '../app-breadcrumb';

describe('AppBreadcrum Component', () => {
    it('renders breadcrumb items correctly', () => {
        const breadcrumbItems = [
            { title: 'Home', url: '/' },
            { title: 'Category', url: '/category' },
            { title: 'Product', url: '/product' },
        ];

        render(<AppBreadCrumb data={breadcrumbItems} />);

        for (const item of breadcrumbItems) {
            expect(screen.getByText(item.title)).toBeInTheDocument();
        }
    });

    it('renders the correct number of breadcrumb items', () => {
        const breadcrumbItems = [
            { title: 'Home', url: '/' },
            { title: 'Category', url: '/category' },
            { title: 'Product', url: '/product' },
        ];

        render(<AppBreadCrumb data={breadcrumbItems} />);

        const breadcrumbElements = screen.getAllByRole('listitem');
        screen.debug(breadcrumbElements);
        expect(breadcrumbElements).toHaveLength(breadcrumbItems.length);
    });
});
