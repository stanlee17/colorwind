import { render, screen } from '@testing-library/react';
import CWButton from '../CWButton';

test('CWButton component renders Save as the children component', () => {
  render(<CWButton className="bg-success">Save</CWButton>);
  const buttonElement = screen.getByText(/Save/i);
  expect(buttonElement).toBeInTheDocument();
});
