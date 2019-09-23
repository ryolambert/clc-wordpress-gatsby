/*eslint-disable*/
import React from 'react';
// react components for routing our app without refresh
import { graphql, StaticQuery } from 'gatsby';
import AniLink from 'gatsby-plugin-transition-link/AniLink';

// @material-ui/core components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import SearchBar from '../Search/SearchBar.jsx';

import headerLinksStyle from 'assets/jss/material-kit-react/components/headerLinksStyle.jsx';

const HEADERLINK_QUERY = graphql`
  fragment menuFields on wordpress__wp_api_menus_menus_items {
    slug
    items {
      title
      url
      object_id
      object_slug
      wordpress_children {
        title
        url
        object_id
        object_slug
      }
    }
  }
  query headerLinkQuery {
    # about: wordpressWpApiMenusMenusItems(wordpress_id: {eq: 110}) {
    #   ...menuFields
    # }
    # media: wordpressWpApiMenusMenusItems(wordpress_id: {eq: 111}) {
    #   ...menuFields
    # }
    # resources: wordpressWpApiMenusMenusItems(wordpress_id: {eq: 111}) {
    #   ...menuFields
    # }
    wordpressWpApiMenusMenusItems(name: { eq: "Main Menu" }) {
      ...menuFields
    }
    siteSearchIndex {
      index
    }
  }
`;

function renderHeaderLink(item, handleDrawerToggle, props) {
  const { classes } = props;
  return (
    <ListItem className={classes.listItem} key={item.object_slug}>
      <AniLink
        fade
        to={`/${item.object_slug}`}
        className={classes.navLink}
        dangerouslySetInnerHTML={{ __html: item.title }}
        onClick={handleDrawerToggle}
      />
    </ListItem>
  );
}

function renderDropMap(item, handleDrawerToggle, props) {
  const { classes } = props;
  let mapDrop = item.wordpress_children.map(child => (
    <AniLink
      fade
      to={`/${child.object_slug}`}
      className={classes.dropdownLink}
      dangerouslySetInnerHTML={{ __html: child.title }}
      key={child.id}
      onClick={handleDrawerToggle}
    />
  ));
  //!! Reassignment on mapDrop
  let splicedMapDrop = mapDrop.splice(
    0,
    0,
    <AniLink
      fade
      to={`/${item.object_slug}`}
      className={classes.dropdownLink}
      dangerouslySetInnerHTML={{ __html: item.title }}
      onClick={handleDrawerToggle}
    />
  );
  return mapDrop;
}

function HeaderLinks({ handleDrawerToggle, ...props }) {
  const { classes } = props;
  return (
    <StaticQuery
      query={HEADERLINK_QUERY}
      render={data => (
        <div>
          <List className={classes.list}>
            <SearchBar
              className={classes.listItemSearch}
              key="searchbar"
              searchIndex={data.siteSearchIndex.index}
            />
            <ListItem className={classes.listItem} key="home">
              <AniLink
                fade
                to="/"
                className={classes.navLink}
                onClick={handleDrawerToggle}
              >
                Home
              </AniLink>
            </ListItem>
            {data.wordpressWpApiMenusMenusItems.items.map(item => {
              if (item.wordpress_children) {
                return (
                  <ListItem className={classes.listItem} key={item.object_slug}>
                    <CustomDropdown
                      className={classes.listItem}
                      noLiPadding
                      buttonText={item.title}
                      buttonProps={{
                        className: classes.navLink,
                        color: 'transparent',
                      }}
                      dropdownList={renderDropMap(
                        item,
                        handleDrawerToggle,
                        props
                      )}
                    />
                  </ListItem>
                );
              } else {
                return renderHeaderLink(item, handleDrawerToggle, props);
              }
            })}
            <ListItem className={classes.listItem} key="media-deadlink">
              <CustomDropdown
                noLiPadding
                buttonText={'Media'}
                buttonProps={{
                  className: classes.navLink,
                  color: 'transparent',
                }}
                dropdownList={[
                  <AniLink
                    fade
                    to="/sermons/"
                    className={classes.dropdownLink}
                    key="sermons"
                    onClick={handleDrawerToggle}
                  >
                    Sermons
                  </AniLink>,
                  <AniLink
                    fade
                    to="/galleries/"
                    className={classes.dropdownLink}
                    key="galleries"
                    onClick={handleDrawerToggle}
                  >
                    Gallery
                  </AniLink>,
                ]}
              />
            </ListItem>
            <ListItem className={classes.listItem} key="calendar">
              <AniLink
                fade
                to="/calendar/"
                className={classes.navLink}
                onClick={handleDrawerToggle}
              >
                Calendar
              </AniLink>
            </ListItem>
            <ListItem className={classes.listItem} key="blog">
              <AniLink
                fade
                to="/blog-page/"
                className={classes.navLink}
                onClick={handleDrawerToggle}
              >
                Blog
              </AniLink>
            </ListItem>
          </List>
        </div>
      )}
    />
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
