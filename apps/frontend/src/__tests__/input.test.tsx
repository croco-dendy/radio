import { render, screen } from '@testing-library/react';
import { Input } from '../components/ui/input';

test('renders label and error', () => {
  render(<Input label="Name" error="Required" />);
  expect(screen.getByText('Name')).toBeInTheDocument();
  expect(screen.getByText('Required')).toBeInTheDocument();
});
