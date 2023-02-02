import { useEffect, useState } from 'react';

const useCheckMobile = () => {
  const [mobile, setMobile] = useState(false);

  const handleCheckScreen = () => {
    if (window.screen.width <= 576 || window.innerWidth <= 576) {
      setMobile(true);
      return;
    }

    setMobile(false);
  };

  useEffect(() => {
    handleCheckScreen();
    window.addEventListener('resize', handleCheckScreen);

    return () => {
      window.removeEventListener('resize', handleCheckScreen);
    };
  }, []);

  return { mobile };
};

export default useCheckMobile;
