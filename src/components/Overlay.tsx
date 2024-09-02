// src/components/Overlay.tsx
import React from 'react';
import styled from 'styled-components';

const OverlayContainer = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  backdrop-filter: blur(5px); /* Blur effect */
  z-index: 999; /* Ensure it's below the sidebar */
`;

const Overlay: React.FC<{ visible: boolean }> = ({ visible }) => (
  <OverlayContainer visible={visible} />
);

export default Overlay;
