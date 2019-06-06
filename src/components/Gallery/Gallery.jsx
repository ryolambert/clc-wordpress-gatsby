import Img from 'gatsby-image';
import { chunk, sum } from 'lodash';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images-z-index-fix';
import { Box, Link } from 'rebass';
import carouselFormatters from '../../utils/carouselFormatters';

const Gallery = ({ images, itemsPerRow: itemsPerRowByBreakpoints }) => {
  const aspectRatios = images.map(image => image.aspectRatio);

  // For each breakpoint, calculate the aspect ratio sum of each row's images
  const rowAspectRatioSumsByBreakpoints = itemsPerRowByBreakpoints.map(
    itemsPerRow =>
      // Split images into groups of the given size
      chunk(aspectRatios, itemsPerRow).map(rowAspectRatios =>
        // Sum aspect ratios of images in the given row
        sum(rowAspectRatios)
      )
  );

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalCurrentIndex, setModalCurrentIndex] = useState(0);

  const closeModal = () => setModalIsOpen(false);
  const openModal = imageIndex => {
    setModalCurrentIndex(imageIndex);
    setModalIsOpen(true);
    console.log('Opened');
  };

  return (
    <Box>
      {images.map((image, i) => (
        <Link
          key={image.id}
          href={image.originalImg}
          onClick={e => {
            e.preventDefault();
            openModal(i);
          }}
          style={{ position: 'relative', zIndex: '1' }}>
          <Box
            as={Img}
            fluid={image}
            title={image.title}
            width={rowAspectRatioSumsByBreakpoints.map(
              (rowAspectRatioSums, j) => {
                const rowIndex = Math.floor(i / itemsPerRowByBreakpoints[j]);
                const rowAspectRatioSum = rowAspectRatioSums[rowIndex];

                return `${(image.aspectRatio / rowAspectRatioSum) * 100}%`;
              }
            )}
            style={{
              display: 'inline-block',
              verticalAlign: 'middle',
              transition: 'filter 0.3s',
              '&:hover,&:focus': {
                filter: 'brightness(87.5%)'
              }
            }}
          />
        </Link>
      ))}

      {ModalGateway && (
        <ModalGateway>
          {modalIsOpen && (
            <Modal onClose={closeModal} style={{}}>
              <Carousel
                views={images.map(({ originalImg, caption }) => ({
                  source: originalImg,
                  caption
                }))}
                currentIndex={modalCurrentIndex}
                formatters={carouselFormatters}
                // components={{ FooterCount: () => null }}
              />
            </Modal>
          )}
        </ModalGateway>
      )}
    </Box>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      aspectRatio: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
      srcSet: PropTypes.string.isRequired,
      sizes: PropTypes.string.isRequired,
      originalImg: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired
    })
  ).isRequired,
  itemsPerRow: PropTypes.arrayOf(PropTypes.number.isRequired)
};

export default Gallery;