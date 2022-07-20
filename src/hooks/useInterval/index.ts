import {useEffect, useRef} from 'react';

const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback);
  const savedInterval = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);
    // @ts-ignore
    savedInterval.current = id;

    return () => clearInterval(id);
  }, [delay]);

  const clear = () => {
    // @ts-ignore
    clearInterval(savedInterval.current);
  };

  return [savedInterval.current, clear];
};

export default useInterval;
