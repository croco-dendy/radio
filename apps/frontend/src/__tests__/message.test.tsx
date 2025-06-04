import { render, screen } from '@testing-library/react';
import { Message } from '../components/message';

const baseMessage = { nickname: 'me', text: 'Hello', timestamp: 't' };

test('renders self message with styling', () => {
  render(<Message message={baseMessage} nickname="me" />);
  const el = screen.getByText('Hello').parentElement as HTMLElement;
  expect(el.className).toContain('text-moss-fog');
});

test('renders other message with nickname', () => {
  render(<Message message={{ ...baseMessage, nickname: 'you' }} nickname="me" />);
  expect(screen.getByText('you')).toBeInTheDocument();
});
