import { render, screen } from '@testing-library/react';
import Chat from '../pages/Chat';

global.matchMedia = global.matchMedia || function () {
    return {
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
    };
};

test('pealkiri navbaril renderib', () => {
    render(<Chat />);
    const pageTitle = screen.getByText(/Vestlus kasutajaga/);
    expect(pageTitle).toBeInTheDocument();
});

test('sõnumi lahter renderib', () => {
    render(<Chat />);
    const chatBox = screen.getByPlaceholderText(/Sisesta sõnum/);
    expect(chatBox).toBeInTheDocument();
});

test('sõnumi saatmise nupp renderib', () => {
    render(<Chat />);
    const sendButton = screen.getByText(/Saada/);
    expect(sendButton).toBeInTheDocument();
});

test('tagasi nupp renderib', () => {
    render(<Chat />);
    const backButton = screen.getByText(/Tagasi/);
    expect(backButton).toBeInTheDocument();
});