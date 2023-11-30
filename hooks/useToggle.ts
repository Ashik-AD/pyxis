import { useCallback, useEffect, useState } from 'react';

export default function useToggle(open?: boolean) {
  const [show, setShow] = useState(open || false);

  const onToggle = useCallback((event: MouseEvent) => {
    setShow((prevShow) => !prevShow);
    event.stopPropagation();
    window.addEventListener('click', onToggle);
  }, []);

  useEffect(() => {
    if (!show) {
      window.removeEventListener('click', onToggle);
    }
    return () => {
      window.removeEventListener('click', onToggle);
    };
  }, [onToggle]);

  return { show, onToggle } as const;
}
