import { useState } from 'react';

export function useDisclosure(initialValue = false) {
  const [isOpen, setIsOpen] = useState(initialValue);

  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  const toggle = () => setIsOpen((open) => !open);

  return { isOpen, open, close, toggle };
}
