import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CWButtonLink from '../CWButtonLink';

const MockButtonList = () => {
  return (
    <BrowserRouter>
      <CWButtonLink url="/generate-palette">Color Generator</CWButtonLink>
    </BrowserRouter>
  );
};

test('CWButton component renders Save as th', () => {
  render(<MockButtonList />);
  const linkElement = screen.getByText(/Color Generator/i);
  expect(linkElement).toBeInTheDocument();
});
