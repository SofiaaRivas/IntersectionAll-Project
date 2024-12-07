import { render, screen, fireEvent } from '@testing-library/react';
import MarkerSubmissionPopup from './MarkerSubmissionPopup';

test('popup appears when user clicks "Yes" to create marker', () => {
  const mockOnSubmit = jest.fn();
  const mockOnClose = jest.fn();
  const location = { lat: 40.748817, lng: -73.985428 };

  render(<MarkerSubmissionPopup isOpen={true} location={location} onClose={mockOnClose} onSubmit={mockOnSubmit} />);

  // user should see a prompt to create a marker
  expect(screen.getByText(/Do you want to create a marker here?/i)).toBeInTheDocument();

  // Click yes to show the form
  fireEvent.click(screen.getByText(/Yes/i));

  // Check if the form is now displayed
  expect(screen.getByText(/Enter Marker Details/i)).toBeInTheDocument();
});
