import { render, screen, fireEvent } from '@testing-library/react';
import MarkerSubmissionForm from './MarkerSubmissionForm';

test('submitting form sends correct data to parent component', () => {
  const mockOnSubmit = jest.fn();
  const location = { lat: 41.50361383886987, lng: -81.60835081349182 }; // cwru centered

  render(<MarkerSubmissionForm location={location} onSubmit={mockOnSubmit} onClose={jest.fn()} />);

  // Select obstacle type
  fireEvent.click(screen.getByLabelText(/Ramp/i));
  
  // Fill out description
  fireEvent.change(screen.getByPlaceholderText(' '), { target: { value: 'Description text' } });

  // Submit form
  fireEvent.click(screen.getByText(/Submit/i));

  expect(mockOnSubmit).toHaveBeenCalledWith({
    type: 'Ramp',
    description: 'Description text',
    latitude: location.lat,
    longitude: location.lng,
  });
});
