import { useState, useEffect } from "react";

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState < T > value;

  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: limpiamos el timeout si value o delay cambian, o si el componente se desmonta
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebouncedValue;
