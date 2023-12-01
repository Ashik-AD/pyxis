import { useCallback, useEffect, useState } from 'react';

export default function useToggle(open?: boolean) {
  const [show, setShow] = useState(open || false);

  const onToggle = useCallback((ev: MouseEvent): void => {
    setShow((prevShow) => !prevShow);
    ev.stopPropagation();
    window.addEventListener('click', onToggle);
  }, []);

  useEffect(() => {
    if (!show) {
      window.removeEventListener('click', onToggle);
    }
    return () => {
      window.removeEventListener('click', onToggle);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onToggle]);

  return { show, onToggle } as const;
}
