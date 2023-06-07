import { useLocalStorage } from "@mantine/hooks";

type UseTimerPinType<T> = [T | null, () => void];

export default function useTimerPin(projectId?: number, sectionId?: number): UseTimerPinType<string> {
  const key = `${projectId ?? 0}-${sectionId ?? 0}`;
  const [currentPin, setCurrentPin, removeCurrentPin] = useLocalStorage<string>({
    key: 'current-pin',
    defaultValue: '0-0'
  })

  const setPin = (): void => {
    if (currentPin === key) {
      removeCurrentPin()
    } else {
      setCurrentPin(key);
    }
  };

  return [currentPin, setPin]
}
