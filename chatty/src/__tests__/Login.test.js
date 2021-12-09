import { render, screen } from '@testing-library/react';
import Login from '../pages/Login';

global.matchMedia = global.matchMedia || function () {
    return {
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
    };
};

test('login lehe pealkiri renderib', () => {
    render(<Login />);
    const pageTitle = screen.getByText(/Chatty/);
    expect(pageTitle).toBeInTheDocument();
});