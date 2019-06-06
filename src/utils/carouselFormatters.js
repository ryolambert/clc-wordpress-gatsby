const carouselFormatters = {
  getAltText: ({ data, index }) =>
    data.caption || `${index + 1}`,

  getNextLabel: ({
    currentIndex,
    views
  }) => `Image ${currentIndex + 2} of ${views.length}`,
  getPrevLabel: ({
    currentIndex,
    views
  }) => `Image ${currentIndex} of ${views.length}`,

  getNextTitle: () => 'Next (right arrow ➡)',
  getPrevTitle: () => 'Previous (⬅ left arrow)',

  getCloseLabel: () => 'Exit (esc)',
  getFullscreenLabel: ({ isFullscreen }) =>
    isFullscreen
      ? 'Exit full-screen (f)'
      : 'Switch to full-screen (f)'
};

export default carouselFormatters;
