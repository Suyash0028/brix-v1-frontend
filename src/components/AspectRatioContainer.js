import React from 'react';
import '../styles/aspectRatioStyles.css'; // Import your CSS file

const AspectRatioContainer = ({ ratio, children }) => {
  const aspectRatioStyle = {
    paddingBottom: `${(1 / ratio) * 100}%`, // Calculate aspect ratio based on width/height ratio
    position: 'relative',
    overflow: 'hidden',
  };

  return (
    <div className="aspect-ratio-container" style={aspectRatioStyle}>
      <div className="aspect-ratio-content">{children}</div>
    </div>
  );
};

export default AspectRatioContainer;
