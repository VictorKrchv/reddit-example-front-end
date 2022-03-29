import { useCallback, useEffect, useLayoutEffect, useState } from 'react';

export const useOnClickOutside = ({
  ref,
  handler,
  ignorList = [],
  disabled,
}: {
  ref: React.RefObject<HTMLElement>;
  handler: Function;
  ignorList?: string[];
  disabled?: boolean;
}) => {
  const listener: any = useCallback(
    (event: React.ChangeEvent) => {
      // console.log('useOnClickOutSide handler', ref?.current, '-елемент');
      // Do nothing if clicking ref's element or descendent elements
      const isContain = ignorList?.length
        ? ignorList
            .map((element) => document.querySelector(element))
            .some((elem: any) => elem && elem.contains(event.target))
        : false;
      if (!ref?.current || ref?.current?.contains(event.target) || isContain) {
        return;
      }
      handler(event);
    },
    [ref, handler, ignorList],
  );

  useEffect(() => {
    if (disabled) {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    } else {
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
    }
  }, [disabled, listener]);

  useEffect(() => {
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [listener]);
};
