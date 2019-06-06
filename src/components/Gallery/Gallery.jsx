import Img from 'gatsby-image';
import { chunk, sum } from 'lodash';
import React, { useState } from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { Box, Link } from 'rebass';
import carouselFormatters from '../../utils/carouselFormatters';
import PropTypes from 'prop-types';

const Gallery = ({
  images,
  imageClick,
  itemsPerRow: itemsPerRowByBreakpoints
}) => {
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
  console.log({ imageClick });

  // console.table({ images });
  return (
    <Box>
      {images.map((image, i) => (
        // <Link key={image.id} href={image.originalImg}>
        <Box
          as={Img}
          fluid={image}
          title={image.title}
          onClick={imageClick}
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
            '&:hover': {
              filter: 'brightness(87.5%)'
            }
          }}
        />
        // </Link>
      ))}
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
  imageClick: PropTypes.func.isRequired,
  itemsPerRow: PropTypes.arrayOf(PropTypes.number.isRequired)
};

export default Gallery;
