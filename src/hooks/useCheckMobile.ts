import { useEffect, useState } from 'react';

const useCheckMobile = () => {
  const [mobile, setMobile] = useState(window.innerWidth <= 576);

  const handleCheckScreen = () => {
    if (window.innerWidth <= 576) {
      setMobile(true);
      return;
    }
    setMobile(false);
  };

  useEffect(() => {
    window.addEventListener('resize', handleCheckScreen);

    return () => {
      window.removeEventListener('resize', handleCheckScreen);
    };
  }, []);

  return { mobile };
};

export default useCheckMobile;
