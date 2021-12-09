import { render, screen } from '@testing-library/react';
import LoginForm from '../pages/Login';

global.matchMedia = global.matchMedia || function () {
    return {
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
    };
};

test('sisselogimise nupp renderib', () => {
    render(<LoginForm />);
    const loginButton = screen.getByText(/Logi sisse/);
    expect(loginButton).toBeInTheDocument();
});

test('registreerimise nupp renderib', () => {
    render(<LoginForm />);
    const registerButton = screen.getByText(/Loo uus kasutaja/);
    expect(registerButton).toBeInTheDocument();
});

test('emaili lahter renderib', () => {
    render(<LoginForm />);
    const emailBox = screen.getByPlaceholderText(/email@domain.com/);
    expect(emailBox).toBeInTheDocument();
});