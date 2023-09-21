import { useEffect, useState } from 'react';

const useCheckMobileScreen = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return { isMobile: width <= 425, isTablet: width <= 768, width }; // 768 -> table
};

export default useCheckMobileScreen;
