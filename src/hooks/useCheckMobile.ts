import { useEffect, useState } from 'react';

const useCheckMobile = () => {
const [mobileStatus, setMobileStatus] = useState(false);

const handleCheckScreen = () => {
  if (window.screen.width <= 576 || window.innerWidth <= 576) {
    setMobileStatus(true);
    return;
  }

  setMobileStatus(false);
};

useEffect(() => {
  window.addEventListener('resize', handleCheckScreen);

  return () => {
    window.removeEventListener('resize', handleCheckScreen);
  };
}, []);

return { mobileStatus };
};

export default useCheckMobile;
