import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';


test('renders header', () => {
  render(<App />);
  const linkElement = screen.getByText(/IntersectionAll/i);
  expect(linkElement).toBeInTheDocument();
});

