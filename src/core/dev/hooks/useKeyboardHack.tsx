export const useKeyInputHack = ({
  callback,
  key1 = "MetaLeft",
  key2 = "KeyK",
}: {
  callback: () => void;
  key1?: string;
  key2?: string;
}) => {
  let keys: Record<string, boolean> = {};
  const handleKeyInputHack = (e: KeyboardEvent) => {
    keys[e.code] = true;

    if (keys[key1] && keys[key2]) {
      callback();
      keys = {};
    }
  };

  return {
    handleKeyInputHack,
  };
};
