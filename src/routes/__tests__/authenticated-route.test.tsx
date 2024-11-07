// src/components/__tests__/ProtectedRoute.test.tsx

import { render, screen, } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi } from 'vitest';
import ProtectedRoute from '../authenticated-route';
import useAuthStore from '@/store/auth-store';

// Mock the auth store
vi.mock('@/store/auth-store');

describe('ProtectedRoute', () => {
//   it('redirects to home if not authenticated', async () => {
//     (useAuthStore as jest.Mock).mockReturnValue({ isAuthenticated: false });

//     render(
//       <MemoryRouter initialEntries={['/protected']}>
//         <Routes>
//           <Route path="/" element={<div>Home</div>} />
//           <Route path="/protected" element={<ProtectedRoute />} />
//         </Routes>
//       </MemoryRouter>
//     );

//     expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
//     expect(screen.queryByText('Home')).toBeInTheDocument();
//   });

  it('renders the outlet if authenticated', () => {
    // Mock the isAuthenticated state to true
    (useAuthStore as vi.Mock).mockReturnValue({ isAuthenticated: true });

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/protected" element={<ProtectedRoute />}>
            <Route path="" element={<div>Protected Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // Assert that the protected content is rendered
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });
});
