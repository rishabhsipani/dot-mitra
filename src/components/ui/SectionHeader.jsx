
import TypewriterText from './TypewriterText';
import './SectionHeader.css';

export default function SectionHeader({
  title,
  highlightWord,
  subtitle,
  alignment = 'center',
  dark = false,
  className = '',
}) {
  const parts = highlightWord ? title.split(highlightWord) : [title];

  return (
    <div className={`section-header section-header--${alignment} ${dark ? 'section-header--dark' : ''} ${className}`}>
      <h2 className="section-header__title">
        {highlightWord ? (
          <>
            {parts[0]}
            <TypewriterText text={highlightWord} />
            {parts[1] || ''}
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p className="section-header__subtitle">{subtitle}</p>
      )}
    </div>
  );
}
