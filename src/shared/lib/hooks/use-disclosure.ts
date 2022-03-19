import { useState } from 'react';

export function useDisclosure() {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return { isOpen, open, close };
}
