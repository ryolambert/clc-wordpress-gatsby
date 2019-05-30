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
import Search from '../Search/Search.jsx';

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
      <Link to={`/${item.object_slug}`} className={classes.navLink}>
        {item.title}
      </Link>
    </ListItem>
  );
}

function renderDropMap(item, props) {
  const { classes } = props;
  let mapDrop = item.wordpress_children.map(child => (
    <Link to={`/${child.object_slug}`} className={classes.dropdownLink}>
      {child.title}
    </Link>
  ));

  let splicedMapDrop = mapDrop.splice(
    0,
    0,
    <Link to={`/${item.object_slug}`} className={classes.dropdownLink}>
      {item.title}
    </Link>
  );
  // console.table(splicedMapDrop);
  return mapDrop;
  // return mapDrop.flatMap(flat => [flat, ',']);
}

function HeaderLinks({ ...props }) {
  const { classes } = props;
  // console.table(...props);
  return (
    <StaticQuery
      query={HEADERLINK_QUERY}
      render={data => (
        <List className={classes.list}>
          {data.wordpressWpApiMenusMenusItems.items.map(item => {
            if (item.wordpress_children) {
              return (
                <ListItem className={classes.listItem} key={item.object_slug}>
                  <CustomDropdown
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
          <Link to="/posts/" className={classes.navLink}>
            Blog
          </Link>
          <Search searchIndex={data.siteSearchIndex.index} />
        </List>
      )}
    />
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
