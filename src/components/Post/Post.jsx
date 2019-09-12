/* eslint-disable react/no-danger */
import React from 'react';
import { Link, navigate } from 'gatsby';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';

// nodejs library that concatenates classes
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import ArrowForwardRounded from '@material-ui/icons/ArrowForwardRounded';
import CardBody from '../Card/CardBody';
import postsIndexPageStyle from '../../assets/jss/material-kit-react/views/postsIndexPageStyle';
import Card from '../Card/Card';
import CardFooter from '../Card/CardFooter';
import GridItem from '../Grid/GridItem';

const Post = ({
  post,
  fallBack,
  showArrow,
  showImage,
  handleTagClick,
  handleCategoryClick,
  ...props
}) => {
  // ms(sec)*sec(min)*min(hr)*hour(day)*days(4weeks)
  const latestDuration = 1000 * 60 * 60 * 24 * 28; // 4weeks total
  const now = Date.now();
  const postDate = new Date(post.node.date).getTime();
  const isLatest = postDate + latestDuration > now;
  const classes = props.classes;
  const fluid = post.node.featured_media
    ? post.node.featured_media.localFile.childImageSharp.fluid
    : fallBack;
  // console.log(
  //   '%c Post Prop Check',
  //   'color: black; font-weight: bold; font-style: italic; background: linear-gradient(to right, #833ab4, #fd1d1d, #fcb045);'
  // );
  // // console.log(post.node.featured_media);
  // console.log(classes.cardTitle);
  // // console.log(fallBack);
  // console.log(fluid);

  return (
    <GridItem xs={11} sm={5} md={3} key={post.node.id}>
      <Link
        to={`/post/${post.node.slug}`}
        className={classes.cardTitle}
        key={post.node.id}
      >
        <Card
          key={post.node.id}
          className={classes.card}
          style={{ marginBottom: 50, display: 'flex' }}
        >
          {fluid && (
            <Img
              className={classes.imgCardTop}
              alt={post.node.title}
              style={{
                height: '200px',
                maxHeight: '25%',
                overflow: 'hidden',
                marginRight: 20,
              }}
              objectFit="cover"
              objectPosition="50% 50%"
              fluid={fluid}
            />
          )}
          {!fluid && fallBack && (
            <Img
              className={classes.imgCardTop}
              alt="fallback image"
              style={{
                height: '200px',
                maxHeight: '25%',
                overflow: 'hidden',
                marginRight: 20,
              }}
              objectFit="cover"
              objectPosition="50% 50%"
              fluid={fallBack}
            />
          )}

          <CardBody>
            <h4 className={classes.cardTitle}>
              {isLatest && <strong>🆕 </strong>}
              <strong dangerouslySetInnerHTML={{ __html: post.node.title }} />
            </h4>
            <p
              className={classes.excerpt}
              dangerouslySetInnerHTML={{ __html: post.node.excerpt }}
            />
          </CardBody>
          <CardFooter className={classes.details}>
            <p>
              <small
                className={classes.textMuted}
                dangerouslySetInnerHTML={{ __html: post.node.date }}
              />
            </p>
            {/* {post.node.tags === null && (
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.8rem',
                    display: 'flex',
                    flexFlow: 'row wrap',
                  }}
                >
                  <span className={classes.cardTag}>#untagged</span>
                  ))}
                </p>
              )} */}
            {post.node.tags !== null && (
              <p
                style={{
                  margin: 0,
                  fontSize: '0.8rem',
                  display: 'flex',
                  flexFlow: 'row wrap',
                }}
              >
                {post.node.tags.map(tag => (
                  <React.Fragment key={post.node.id + tag.name}>
                    <span
                      onClick={handleTagClick}
                      data-filter={tag.name}
                      className={classes.cardTag}
                    >
                      {`#${tag.name}`}
                    </span>
                  </React.Fragment>
                ))}
              </p>
            )}
            {showArrow === true && (
              <Link
                to={`/post/${post.node.slug}`}
                className={classes.cardTitle}
                key={post.node.id}
              >
                <ArrowForwardRounded
                  style={{ height: '24px', justifySelf: 'flex-end' }}
                />
              </Link>
            )}
          </CardFooter>
        </Card>
      </Link>
    </GridItem>
  );
};

Post.propTypes = {
  post: PropTypes.object,
  fallBack: PropTypes.object,
  showArrow: PropTypes.bool,
  showImage: PropTypes.bool,
  handleTagClick: PropTypes.func,
  handleCategoryClick: PropTypes.func,
};

export default withStyles(postsIndexPageStyle)(Post);
