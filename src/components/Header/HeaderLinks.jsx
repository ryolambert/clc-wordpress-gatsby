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
import PropTypes from 'prop-types';

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
  // const { classes } = props;
  return (
    <ListItem className={props.classes.listItem} key={item.object_slug}>
      <Link
        to={`/${item.object_slug}`}
        className={props.classes.navLink}
        dangerouslySetInnerHTML={{ __html: item.title }}
        onClick={props.handleDrawerToggle}
      />
    </ListItem>
  );
}

function renderDropMap(item, props) {
  // const { classes } = props;
  let mapDrop = item.wordpress_children.map(child => (
    <Link
      to={`/${child.object_slug}`}
      className={props.classes.dropdownLink}
      dangerouslySetInnerHTML={{ __html: child.title }}
      onClick={props.handleDrawerToggle}
      key={child.id}
    />
  ));
  //!! Reassignment on mapDrop
  let splicedMapDrop = mapDrop.splice(
    0,
    0,
    <Link
      to={`/${item.object_slug}`}
      className={props.classes.dropdownLink}
      dangerouslySetInnerHTML={{ __html: item.title }}
      onClick={props.handleDrawerToggle}
    />
  );
  return mapDrop;
}

function HeaderLinks({ ...props }) {
  // const { classes } = props;
  console.log(
    '%c HEADERLINKS PROPS TEST ',
    'background: pink; color: black; font-weight: bold;'
  );
  console.log(props);
  return (
    <StaticQuery
      query={HEADERLINK_QUERY}
      render={data => (
        <div>
          <List className={props.classes.list}>
            <SearchBar
              className={props.classes.listItemSearch}
              key="searchbar"
              searchIndex={data.siteSearchIndex.index}
            />
            <ListItem className={props.classes.listItem} key="home">
              <Link
                to="/"
                className={props.classes.navLink}
                onClick={props.handleDrawerToggle}
              >
                Home
              </Link>
            </ListItem>
            {data.wordpressWpApiMenusMenusItems.items.map(item => {
              if (item.wordpress_children) {
                return (
                  <ListItem
                    className={props.classes.listItem}
                    key={item.object_slug}
                  >
                    <CustomDropdown
                      className={props.classes.listItem}
                      noLiPadding
                      buttonText={item.title}
                      buttonProps={{
                        className: props.classes.navLink,
                        color: 'transparent',
                      }}
                      dropdownList={renderDropMap(item, props)}
                    />
                  </ListItem>
                );
              } else {
                return renderHeaderLink(item, props);
              }
            })}
            <ListItem className={props.classes.listItem} key="media-deadlink">
              <CustomDropdown
                noLiPadding
                buttonText={'Media'}
                buttonProps={{
                  className: props.classes.navLink,
                  color: 'transparent',
                }}
                dropdownList={[
                  <Link
                    to="/sermons/"
                    className={props.classes.dropdownLink}
                    onClick={props.handleDrawerToggle}
                    key="sermons"
                  >
                    Sermons
                  </Link>,
                  <Link
                    to="/galleries/"
                    className={props.classes.dropdownLink}
                    onClick={props.handleDrawerToggle}
                    key="galleries"
                  >
                    Gallery
                  </Link>,
                ]}
              />
            </ListItem>
            <ListItem className={props.classes.listItem} key="calendar">
              <Link
                to="/calendar/"
                className={props.classes.navLink}
                onClick={props.handleDrawerToggle}
              >
                Calendar
              </Link>
            </ListItem>
            <ListItem className={props.classes.listItem} key="blog">
              <Link
                to="/blog-page/"
                className={props.classes.navLink}
                onClick={props.handleDrawerToggle}
              >
                Blog
              </Link>
            </ListItem>
          </List>
        </div>
      )}
    />
  );
}

HeaderLinks.propTypes = {
  toggleDrawer: PropTypes.func,
};

export default withStyles(headerLinksStyle)(HeaderLinks);
