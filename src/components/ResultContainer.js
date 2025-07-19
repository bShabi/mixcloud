import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSearch from '../useHook/useSearch';
import MixcloudPlayer from '../utils/MixcloudPlayer';

const ResultContainer = () => {
  const { artistSelected } = useSearch();
  const [isMobile, setIsMobile] = useState(false);
  const [isShowPlayer, setIsShowPlayer] = useState(false);
 
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (artistSelected) {
      setIsShowPlayer(false);
    }
  }, [artistSelected]);

  const handleImageClick = () => {
    setIsShowPlayer(true);
  };

  if (!artistSelected) {
    return <p>No artist selected</p>;
  }

  const imageUrl = isMobile
    ? artistSelected.pictures['320wx320h'] || artistSelected.pictures['medium_mobile']
    : artistSelected.pictures['640wx640h'] || artistSelected.pictures['extra_large'];

  return (
    <div className="artist-info">
      <AnimatePresence mode="wait">
        <motion.img
          key={artistSelected.key}
          layoutId={`artist-image-${artistSelected.key}`}
          className="artist-image"
          src={imageUrl}
          alt={artistSelected.name}
          onClick={() => handleImageClick()}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          style={{ cursor: 'pointer' }}
        />
      </AnimatePresence>

      {isShowPlayer && <MixcloudPlayer feedUrl={artistSelected.url} />}
    </div>
  );
};

export default ResultContainer;
