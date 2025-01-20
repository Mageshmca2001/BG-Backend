import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading';

const RouteWithLoader = ({ element: Element }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const minLoadingTime = 5000; // 5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, minLoadingTime);

    return () => clearTimeout(timer);
  }, []);

  return loading ? <Loading /> : <Element />;
};

export default RouteWithLoader;
