import { useCallback, useRef, useLayoutEffect } from "react";

type callbackType<A extends any[], R> = (...args: A) => R;

export const useEvent = <A extends any[], R>(
  callback: callbackType<A, R>
): callbackType<A, R> => {
  const functionRef = useRef(callback);

  useLayoutEffect(() => {
    functionRef.current = callback;
  });

  return useCallback((...args) => {
    const func = functionRef.current;
    return func(...args);
  }, []);
};