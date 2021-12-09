import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';

global.matchMedia = global.matchMedia || function () {
    return {
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
    };
};

test('väljalogimise nupp renderib', () => {
    render(<Home />);
    const logoutButton = screen.getByText(/Logi välja/);
    expect(logoutButton).toBeInTheDocument();
});

test('otsingu nupp renderib', () => {
    render(<Home />);
    const searchButton = screen.getByText(/Otsi/);
    expect(searchButton).toBeInTheDocument();
});

test('otsingu lahter renderib', () => {
    render(<Home />);
    const searchBox = screen.getByPlaceholderText(/Otsi kasutajat/);
    expect(searchBox).toBeInTheDocument();
});