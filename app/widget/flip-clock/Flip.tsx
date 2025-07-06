'use client';

import React, { useRef, useEffect } from 'react';
import '@pqina/flip/dist/flip.min.css';
import './Flip.css';

interface Props {
  value: string | string[];
  size?: 'lg' | 'md' | 'sm';
}
export default function Flip({ value, size = 'md' }: Props) {
  const divRef = useRef<HTMLDivElement>(null);
  const tickRef = useRef<Tick>(null);

  useEffect(() => {
    let isMounted = true;

    import('@pqina/flip').then((mod) => {
      if (!isMounted) return;
      const Tick = (mod.default ?? mod) as Tick;
      tickRef.current = Tick;

      if (Tick?.DOM == null) {
        return;
      }

      const didInit = (tick: Tick) => {
        tickRef.current = tick;
      };

      const currentDiv = divRef.current;
      if (currentDiv == null) {
        return;
      }

      Tick.DOM.create(currentDiv, {
        value,
        didInit,
      });
    });

    return () => {
      isMounted = false;
      tickRef?.current?.DOM?.destroy(tickRef.current);
    };
  }, [value]);

  useEffect(() => {
    if (tickRef.current) {
      tickRef.current.value = value;
    }
  }, [value]);

  const className = `tick ${size}`;

  return (
    <div ref={divRef} className={className}>
      <div data-repeat="true">
        <span data-view="flip" />
      </div>
    </div>
  );
}
