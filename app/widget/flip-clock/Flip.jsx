'use client';

import Tick from '@pqina/flip';
import React, { useRef, useEffect } from 'react';
import '@pqina/flip/dist/flip.min.css';
import './Flip.css';

export default function Flip({ value, size }) {
  const divRef = useRef();
  const tickRef = useRef();

  useEffect(() => {
    const didInit = (tick) => {
      tickRef.current = tick;
    };

    const currDiv = divRef.current;
    Tick.DOM.create(currDiv, {
      value,
      didInit,
    });

    return () => Tick.DOM.destroy(tickRef.current);
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
