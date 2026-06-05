import './GradientText.css';

export default function GradientText({ children, as: Tag = 'span', className = '' }) {
  return (
    <Tag className={`gradient-text ${className}`}>
      {children}
    </Tag>
  );
}
