import './CTAButton.css';
import { ArrowRight } from 'lucide-react';

export default function CTAButton({
  label,
  href = '#',
  variant = 'primary',
  icon = false,
  onClick,
  className = '',
}) {
  const Tag = href && href !== '#' ? 'a' : 'button';
  const props = Tag === 'a' ? { href } : { onClick };

  return (
    <Tag
      className={`cta-button cta-button--${variant} ${className}`}
      {...props}
    >
      <span className="cta-button__label">{label}</span>
      {icon && (
        <span className="cta-button__icon">
          <ArrowRight size={16} />
        </span>
      )}
    </Tag>
  );
}
