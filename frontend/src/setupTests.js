// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

// Mock the Google Maps components
jest.mock('@react-google-maps/api', () => ({
  GoogleMap: (props) => <div data-testid="google-map" {...props} />,
  LoadScript: ({ children }) => <div>{children}</div>,
}));


