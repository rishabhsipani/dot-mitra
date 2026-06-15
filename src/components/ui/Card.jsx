import './Card.css';

export default function Card({
  children,
  variant = 'default',
  hoverable = true,
  className = '',
  dark = false,
}) {
  return (
    <div
      className={`card card--${variant} ${hoverable ? 'card--hoverable' : ''} ${dark ? 'card--dark' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
