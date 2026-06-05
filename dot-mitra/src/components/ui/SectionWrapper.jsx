import './SectionWrapper.css';

export default function SectionWrapper({
  id,
  dark = false,
  className = '',
  children,
  noPadding = false,
}) {
  return (
    <section
      id={id}
      className={`section ${dark ? 'section--dark' : 'section--light'} ${noPadding ? 'section--no-padding' : ''} ${className}`}
    >
      {children}
    </section>
  );
}
