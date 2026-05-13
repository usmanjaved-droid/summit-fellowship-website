'use client';

import { useInViewReveal } from './hooks/useInViewReveal';
import type { ReactNode, Ref } from 'react';

type AsTag = 'div' | 'section' | 'article' | 'li';

export default function Reveal({
  as: As = 'div',
  className = '',
  children,
}: {
  as?: AsTag;
  className?: string;
  children: ReactNode;
}) {
  const ref = useInViewReveal<HTMLElement>();
  const Component = As as AsTag;
  return (
    <Component
      ref={ref as Ref<HTMLElement> as never}
      className={`reveal ${className}`}
    >
      {children}
    </Component>
  );
}
