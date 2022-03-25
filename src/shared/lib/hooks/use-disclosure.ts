import { useState } from 'react';

export function useDisclosure(initialValue = false) {
  const [isOpen, setIsOpen] = useState(initialValue);

  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return { isOpen, open, close };
}
