import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { DialogDataStatus } from './DataStatus.jsx';

// Native dialog supplies modal focus containment, inert background and Escape.
export function Dialog({ onClose, label, children }) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const previous = document.activeElement;
    const el = ref.current;
    el.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      el.close();
      document.body.style.overflow = overflow;
      if (previous?.isConnected) previous.focus();
    };
  }, []);
  return createPortal(<dialog ref={ref} className="atlas-dialog" aria-label={label}
    onCancel={(e) => { e.preventDefault(); closeRef.current(); }}
    onClick={(e) => { if (e.target === ref.current) closeRef.current(); }}>
    {children}
    <DialogDataStatus />
  </dialog>, document.body);
}
