import { useEffect, useState } from "react";

const getStoredPin = () => window.localStorage.getItem("pinnedSection");

export default function useTimerPin(projectId?: number, sectionId?: number) {
  const key = `${projectId}-${sectionId}`;
  const [currentPin, setCurrentPin] = useState(() => {
    return getStoredPin();
  });

  const storedPinListener = () => {
    const storedValue = getStoredPin();
    setCurrentPin(storedValue || currentPin);
  };

  useEffect(() => {
    window.addEventListener("storage", storedPinListener);

    return () => {
      window.removeEventListener("storage", storedPinListener);
    };
  }, []);

  const setPin = () => {
    if (currentPin === key) {
      setCurrentPin('0');
      window.localStorage.setItem("pinnedSection", '0');
      window.dispatchEvent(new Event("storage"));
    } else {
      setCurrentPin(key);
      window.localStorage.setItem("pinnedSection", key);
      window.dispatchEvent(new Event("storage"));
    }
  };

  return [currentPin, setPin] as const;
}
