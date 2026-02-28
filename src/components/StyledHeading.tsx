interface StyledHeadingProps {
  children: string;
  level?: 'primary' | 'section' | 'tertiary';
  className?: string;
}

export function StyledHeading({ children, level = 'section', className = '' }: StyledHeadingProps) {
  const levelClass = level === 'primary' ? 'cc-primary-title' : level === 'section' ? 'cc-section-heading' : 'cc-tertiary-heading';

  if (level === 'tertiary') {
    return <h3 className={`${levelClass} ${className}`}>{children}</h3>;
  }

  return level === 'primary' ? (
    <h1 className={`${levelClass} ${className}`} data-text={children}>
      {children}
    </h1>
  ) : (
    <h2 className={`${levelClass} ${className}`} data-text={children}>
      {children}
    </h2>
  );
}
