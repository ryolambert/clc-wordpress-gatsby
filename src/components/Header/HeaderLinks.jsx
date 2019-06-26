/*eslint-disable*/
import React from 'react';
// react components for routing our app without refresh
import { graphql, Link, StaticQuery } from 'gatsby';

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

function renderHeaderLink(item, props) {
  const { classes } = props;
  return (
    <ListItem className={classes.listItem} key={item.object_slug}>
      <Link
        to={`/${item.object_slug}`}
        className={classes.navLink}
        dangerouslySetInnerHTML={{ __html: item.title }}
      />
    </ListItem>
  );
}

function renderDropMap(item, props) {
  const { classes } = props;
  let mapDrop = item.wordpress_children.map(child => (
    <Link
      to={`/${child.object_slug}`}
      className={classes.dropdownLink}
      dangerouslySetInnerHTML={{ __html: child.title }}
      key={child.id}
    />
  ));
  //!! Reassignment on mapDrop
  let splicedMapDrop = mapDrop.splice(
    0,
    0,
    <Link
      to={`/${item.object_slug}`}
      className={classes.dropdownLink}
      dangerouslySetInnerHTML={{ __html: item.title }}
    />
  );
  return mapDrop;
}

function HeaderLinks({ ...props }) {
  const { classes } = props;
  return (
    <StaticQuery
      query={HEADERLINK_QUERY}
      render={data => (
        <div>
          <List className={classes.list}>
            <SearchBar
              classes={classes.listItemSearch}
              key="searchbar"
              searchIndex={data.siteSearchIndex.index}
            />
            <ListItem className={classes.listItem} key="home">
              <Link to="/" className={classes.navLink}>
                Home
              </Link>
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
                        color: 'transparent'
                      }}
                      dropdownList={renderDropMap(item, props)}
                    />
                  </ListItem>
                );
              } else {
                return renderHeaderLink(item, props);
              }
            })}
            <ListItem className={classes.listItem} key="media-deadlink">
              <CustomDropdown
                noLiPadding
                buttonText={'Media'}
                buttonProps={{
                  className: classes.navLink,
                  color: 'transparent'
                }}
                dropdownList={[
                  <Link
                    to="/sermons/"
                    className={classes.dropdownLink}
                    key="sermons">
                    Sermons
                  </Link>,
                  <Link
                    to="/galleries/"
                    className={classes.dropdownLink}
                    key="galleries">
                    Gallery
                  </Link>
                ]}
              />
            </ListItem>
            <ListItem className={classes.listItem} key="calendar">
              <Link to="/calendar/" className={classes.navLink}>
                Calendar
              </Link>
            </ListItem>
            <ListItem className={classes.listItem} key="blog">
              <Link to="/posts/" className={classes.navLink}>
                Blog
              </Link>
            </ListItem>
          </List>
        </div>
      )}
    />
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
