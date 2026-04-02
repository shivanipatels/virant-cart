import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();  // Get the current pathname from the location object provided by react-router-dom

  useEffect(() => { // Scroll to the top of the page whenever the pathname changes, ensuring that users start at the top when navigating to a new page
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;