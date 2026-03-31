import { useCallback, useRef, useLayoutEffect } from 'react';

type CallbackType<A extends any[], R> = (...args: A) => R;

export function useEvent<A extends any[], R>(
  callback: CallbackType<A, R>,
): CallbackType<A, R> {
  const functionRef = useRef(callback);

  useLayoutEffect(() => {
    functionRef.current = callback;
  });

  return useCallback((...callbackArgs) => {
    const func = functionRef.current;
    return func(...callbackArgs);
  }, []);
}
