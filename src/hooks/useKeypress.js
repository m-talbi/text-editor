import { useEffect } from 'react';

export const useKeyPress = (targetKey, callback) => {

  const downHandler = (ev) => {
    if (ev.key === targetKey) callback(ev);
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, []);
};