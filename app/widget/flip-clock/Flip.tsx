'use client';

import React, { useRef, useEffect } from 'react';
import '@pqina/flip/dist/flip.min.css';
import './Flip.css';

interface Props {
  value: string | string[];
  size: 'lg' | 'md' | 'sm';
}
export default function Flip({ value, size }: Props) {
  const divRef = useRef<HTMLDivElement>(null);

  const TickRef = useRef<Tick>(null); // Class
  const tickRef = useRef<Tick>(null); // Instance

  useEffect(() => {
    let isMounted = true;

    import('@pqina/flip').then((mod) => {
      if (isMounted === false) {
        return;
      }

      const Tick = (mod.default || mod) as Tick;
      TickRef.current = Tick;
      if (Tick?.DOM == null) {
        return;
      }

      const didInit = (tick: Tick) => {
        tickRef.current = tick;
      };

      const targetDiv = divRef.current;
      if (targetDiv == null) {
        return;
      }

      Tick.DOM.create(targetDiv, {
        value,
        didInit,
      });
    });

    return () => {
      isMounted = false;
      if (tickRef.current && TickRef.current?.DOM) {
        TickRef.current.DOM.destroy(tickRef.current);
      }
    };
  }, [value]);

  useEffect(() => {
    if (tickRef.current) {
      tickRef.current.value = value;
    }
  }, [value]);

  const className = ['tick', size].join(' ');
  return (
    <div ref={divRef} className={className}>
      <div data-repeat="true">
        <span data-view="flip" />
      </div>
    </div>
  );
}
