import { useCallback, useRef, useLayoutEffect } from "react";

type CallbackType<A extends any[], R> = (...args: A) => R;

export const useEvent = <A extends any[], R>(
  callback: CallbackType<A, R>
): CallbackType<A, R> => {
  const functionRef = useRef(callback);

  useLayoutEffect(() => {
    functionRef.current = callback;
  });

  return useCallback((...args) => {
    const func = functionRef.current;
    return func(...args);
  }, []);
};