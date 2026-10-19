import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Arrow } from './Arrow';
import styles from './fop.module.css';

export type ButtonVariant = 'primary' | 'white' | 'hollow' | 'danger' | 'cancel';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  icon?: boolean;
  children?: ReactNode;
};
type AsAnchor = Common & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;
type AsButton = Common & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>;
export type ButtonProps = AsAnchor | AsButton;

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', block, icon, children, className, ...rest } = props;
  const cls = [
    styles['fop-btn'],
    styles[`fop-btn--${variant}`],
    size !== 'md' && styles[`fop-btn--${size}`],
    block && styles['fop-btn--block'],
    icon && styles['fop-btn--has-icon'],
    icon && styles['fop-nudge'],
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const content = (
    <>
      {children}
      {icon && <Arrow length={32} />}
    </>
  );

  if (typeof props.href === 'string') {
    const { href, ...anchorRest } = rest as AsAnchor;
    if (href.startsWith('/')) {
      return (
        <Link href={href} className={cls} {...anchorRest}>
          {content}
        </Link>
      );
    }
    return (
      <a href={href} className={cls} {...anchorRest}>
        {content}
      </a>
    );
  }
  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" className={cls} {...buttonRest}>
      {content}
    </button>
  );
}
