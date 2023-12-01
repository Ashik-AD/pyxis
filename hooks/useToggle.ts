import { SyntheticEvent, useCallback, useState, useEffect } from 'react';

export default function useToggle(open?: boolean) {
  const [show, setShow] = useState(open || false);

  const onToggle = useCallback(
    (ev: SyntheticEvent<HTMLElement> | MouseEvent): void => {
      setShow((prevShow) => !prevShow);
      ev.stopPropagation();
      ev.preventDefault();
    },
    []
  );

  useEffect(() => {
    return () => {
      window.removeEventListener('click', onToggle);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onToggle]);

  return { show, onToggle } as const;
}
