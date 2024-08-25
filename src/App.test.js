import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App component', () => {
  test('renders the homepage by default', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText('Homepage')).toBeInTheDocument();
  });

  test('renders the login page when navigating to /auth/login', () => {
    window.history.pushState({}, 'Login Page', '/auth/login');
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  test('renders the pricing page when navigating to /pricing', () => {
    window.history.pushState({}, 'Pricing Page', '/pricing');
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText('Pricing Page')).toBeInTheDocument();
  });

  test('renders not found page on unknown route', () => {
    window.history.pushState({}, 'Unknown Page', '/unknown');
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });
});
