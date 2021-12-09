import { render, screen } from '@testing-library/react';
import Register from '../pages/Register';

global.matchMedia = global.matchMedia || function () {
    return {
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
    };
};

test('lehe pealkiri renderib', () => {
    render(<Register />);
    const pageTitle = screen.getByText(/Loo uus kasutaja/);
    expect(pageTitle).toBeInTheDocument();
});

test('registreerimise nupp renderib', () => {
    render(<Register />);
    const registerButton = screen.getByText(/Registreeri/);
    expect(registerButton).toBeInTheDocument();
});

test('nimede lahtrid renderdavad', () => {
    render(<Register />);
    const firstNameBox = screen.getByPlaceholderText(/Kalle/);
    const lastNameBox = screen.getByPlaceholderText(/Kaalikas/);
    expect(firstNameBox).toBeInTheDocument();
    expect(lastNameBox).toBeInTheDocument();
});