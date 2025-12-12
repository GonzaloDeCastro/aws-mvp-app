import { useState, useEffect } from "react";

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState < T > value;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // NOTE: cleanup is missing here
  }, [value]); // delay is not included

  return debouncedValue;
}

export default useDebouncedValue;
