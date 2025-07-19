import React from 'react';

const MixcloudPlayer = ({ feedUrl }) => {
  const encodedUrl = encodeURIComponent(feedUrl);
  return (
    <iframe
      width="100%"
      height="120"
      src={`https://www.mixcloud.com/widget/iframe/?feed=${feedUrl}&hide_cover=1&light=1`}
      allow="autoplay; encrypted-media"
      title="Mixcloud Player"
    ></iframe>
  );
};
export default MixcloudPlayer;