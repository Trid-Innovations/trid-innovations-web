"use client";
import React, { useState, useEffect } from "react";

const useDeviceDetect = () => {
  // Initialize with null or false to indicate the value is not known yet
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // This function will be executed only on the client side
    const handleResize = () => {
      setIsMobile(window?.innerWidth < 768);
    };

    // Set the initial value
    handleResize();

    // Setup event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile };
};

export default useDeviceDetect;
