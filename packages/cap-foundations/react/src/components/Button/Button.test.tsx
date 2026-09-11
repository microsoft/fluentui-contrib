import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  // ---------------------------------------------------------------------------
  // Rendering
  // ---------------------------------------------------------------------------

  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('renders as a <button> by default', () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('sets type="button" on native button', () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  // ---------------------------------------------------------------------------
  // Variants
  // ---------------------------------------------------------------------------

  it('applies default variant class', () => {
    render(<Button variant="default">Default</Button>);
    expect(screen.getByRole('button')).toHaveClass('default');
  });

  it('applies primary variant class', () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('primary');
  });

  it('applies danger variant class', () => {
    render(<Button variant="danger">Danger</Button>);
    expect(screen.getByRole('button')).toHaveClass('danger');
  });

  it('applies ghost variant class', () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('ghost');
  });

  it('defaults to the default variant', () => {
    render(<Button>No variant prop</Button>);
    expect(screen.getByRole('button')).toHaveClass('default');
  });

  // ---------------------------------------------------------------------------
  // Sizes
  // ---------------------------------------------------------------------------

  it('applies sm size class', () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('sm');
  });

  it('applies md size class', () => {
    render(<Button size="md">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass('md');
  });

  it('applies lg size class', () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('lg');
  });

  it('defaults to md size', () => {
    render(<Button>No size prop</Button>);
    expect(screen.getByRole('button')).toHaveClass('md');
  });

  // ---------------------------------------------------------------------------
  // Disabled state
  // ---------------------------------------------------------------------------

  it('is disabled when disabled=true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies disabled class when disabled', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toHaveClass('disabled');
  });

  it('does not fire onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // ---------------------------------------------------------------------------
  // Loading state
  // ---------------------------------------------------------------------------

  it('is disabled when loading=true', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies loading class when loading', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toHaveClass('loading');
  });

  it('sets aria-busy when loading', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('does not set aria-busy when not loading', () => {
    render(<Button>Normal</Button>);
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-busy');
  });

  it('renders spinner SVG when loading', () => {
    const { container } = render(<Button loading>Loading</Button>);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  // ---------------------------------------------------------------------------
  // Click handler
  // ---------------------------------------------------------------------------

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // ---------------------------------------------------------------------------
  // Icon slots
  // ---------------------------------------------------------------------------

  it('renders leading icon when icon prop is provided', () => {
    render(<Button icon={<span data-testid="icon" />}>With icon</Button>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders trailing icon when iconAfter prop is provided', () => {
    render(<Button iconAfter={<span data-testid="icon-after" />}>With icon after</Button>);
    expect(screen.getByTestId('icon-after')).toBeInTheDocument();
  });

  it('hides trailing icon when loading', () => {
    render(
      <Button loading iconAfter={<span data-testid="icon-after" />}>
        Loading
      </Button>,
    );
    expect(screen.queryByTestId('icon-after')).not.toBeInTheDocument();
  });

  it('replaces leading icon with spinner when loading', () => {
    const { container } = render(
      <Button loading icon={<span data-testid="icon" />}>
        Loading
      </Button>,
    );
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  // ---------------------------------------------------------------------------
  // Polymorphic — as="a"
  // ---------------------------------------------------------------------------

  it('renders as an anchor when as="a"', () => {
    render(
      <Button as="a" href="/dashboard">
        Go
      </Button>,
    );
    expect(screen.getByRole('link', { name: 'Go' })).toBeInTheDocument();
  });

  it('passes href to anchor element', () => {
    render(
      <Button as="a" href="/dashboard">
        Go
      </Button>,
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', '/dashboard');
  });

  it('sets aria-disabled on anchor when disabled', () => {
    render(
      <Button as="a" href="/dashboard" disabled>
        Disabled link
      </Button>,
    );
    // A disabled anchor has no href, so it loses the link role — query by text instead
    expect(screen.getByText('Disabled link')).toHaveAttribute('aria-disabled', 'true');
  });

  it('removes href from anchor when disabled', () => {
    render(
      <Button as="a" href="/dashboard" disabled>
        Disabled link
      </Button>,
    );
    expect(screen.getByText('Disabled link')).not.toHaveAttribute('href');
  });

  // ---------------------------------------------------------------------------
  // className composition
  // ---------------------------------------------------------------------------

  it('composes consumer className with internal classes', () => {
    render(<Button className="my-custom">Button</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('my-custom');
    expect(btn).toHaveClass('root');
  });

  // ---------------------------------------------------------------------------
  // fullWidth
  // ---------------------------------------------------------------------------

  it('applies fullWidth class when fullWidth=true', () => {
    render(<Button fullWidth>Full width</Button>);
    expect(screen.getByRole('button')).toHaveClass('fullWidth');
  });

  // ---------------------------------------------------------------------------
  // ARIA / displayName
  // ---------------------------------------------------------------------------

  it('passes through aria-label', () => {
    render(<Button aria-label="Close dialog" />);
    expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument();
  });
});
