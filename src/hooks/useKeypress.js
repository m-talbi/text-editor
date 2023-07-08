import { useEffect } from 'react';

export const useKeyPress = (callback) => {

  const downHandler = (ev) => {
    callback(ev);
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, []);
};