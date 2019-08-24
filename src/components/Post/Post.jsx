import React from "react";
import { Link, navigate } from "gatsby";
import PropTypes from "prop-types";
import { Button, Card, CardBody, CardFooter } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import ArrowForwardRound from "@material-ui/icons";
import postsIndexPageStyle from "assets/jss/material-kit-react/views/postsIndexPageStyle";

import { GridItem } from "./Grid/GridItem";

const Post = ({
  post,
  fallBackParallax,
  showArrow,
  showImage,
  handleTagCLick,
  handleCategoryClick
}) => {
  // ms(sec)*sec(min)*min(hr)*hour(day)*days(4weeks)
  const latestDuration = 1000 * 60 * 60 * 24 * 28; // 4weeks total
  const now = Date.now();
  const postDate = new Date(post.node.date).getTime();
  const isLatest = postDate + latestDuration > now;
  const classes = props;

  return (
    <div>
      <GridItem xs={11} sm={5} md={3} key={post.node.id}>
        <Link
          to={`/post/${post.node.slug}`}
          className={classes.cardTitle}
          key={node.id}
        >
          <Card
            key={post.node.id}
            className={classes.card}
            style={{ marginBottom: 50, display: "flex" }}
          >
            {post.node.featured_media && (
              <Img
                className={classes.imgCardTop}
                alt={post.node.title}
                style={{
                  height: "200px",
                  maxHeight: "25%",
                  overflow: "hidden",
                  marginRight: 20
                }}
                objectFit="cover"
                objectPosition="50% 50%"
                fluid={post.node.featured_media.localFile.childImageSharp.fluid}
              />
            )}
            {!post.node.featured_media && (
              <Img
                className={classes.imgCardTop}
                alt="fallback image"
                style={{
                  height: "200px",
                  maxHeight: "25%",
                  overflow: "hidden",
                  marginRight: 20
                }}
                objectFit="cover"
                objectPosition="50% 50%"
                fluid={fallBackParallax}
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
            </CardFooter>
          </Card>
        </Link>
      </GridItem>
    </div>
  );
};

componentName.propTypes = {
  post: PropTypes.object,
  fallBackParallax: PropTypes.object,
  showArrow: PropTypes.bool,
  showImage: PropTypes.bool,
  handleTagClick: PropTypes.func,
  handleCategoryClick: PropTypes.func
};

export default withStyles(postsIndexPageStyle)(Post());
