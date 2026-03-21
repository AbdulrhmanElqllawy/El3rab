import { useEffect } from "react";
import { useLocation } from "react-router-dom";



export default function NavigationTracker() {
  const location = useLocation();

  useEffect(() => {
    // page changed
    console.log("Page:", location.pathname);
  }, [location]);

  return null;
}

// useEffect(() => {
//   console.log("user navigated to:", location.pathname)
// }, [location])