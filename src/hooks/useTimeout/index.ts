import {useEffect, useRef} from 'react';
// @ts-ignore
import {NodeJS} from 'timers';

const useTimeout = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback);
  const savedTimeoutId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }

    const id = setTimeout(() => savedCallback.current(), delay);
    savedTimeoutId.current = id;
    return () => clearTimeout(id);
  }, [delay]);

  const clear = () => {
    clearTimeout(savedTimeoutId.current);
  };

  return [savedTimeoutId.current, clear];
};

export default useTimeout;
