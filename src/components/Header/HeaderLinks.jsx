/*eslint-disable*/
import React from 'react';
// react components for routing our app without refresh
import { StaticQuery, graphql, Link } from 'gatsby';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';

// @material-ui/icons
import { Apps, CloudDownload } from '@material-ui/icons';

// React icons
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

// core components
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.jsx';
import Button from 'components/CustomButtons/Button.jsx';

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
  }
`;

const renderLink = item => {
  return (
    <ListItem>
      <Link
        to={`/${item.object_slug}`}
        className={headerLinksStyle.dropdownLink}>
        {item.title}
      </Link>
    </ListItem>
  );
};

const renderHeaderLink = item => {
  if (item.wordpress_children && item.wordpress_children.length) {
    return renderHeaderDropLinks(item);
  } else {
    return (
      <ListItem className="listItem" key={item.object_slug}>
        {renderLink(item)}
      </ListItem>
    );
  }
};

const renderDropMap = item => {};

const renderHeaderDropLinks = item => {
  return (
    <ListItem className="listItem" key={item.object_slug}>
      {/* {renderLink(item)} */}
      <CustomDropdown
        noLiPadding
        buttonText={item.object_slug}
        buttonProps={{
          className: headerLinksStyle.navLink,
          color: 'transparent'
        }}
        dropdownList={[
          <ListItem>
            {item.wordpress_children.map(child => (
              <Link to={`/${child.object_slug}`}>{child.title}</Link>
            ))}
          </ListItem>
        ]}
      />
    </ListItem>
  );
};

function HeaderLinks({ ...props }) {
  const { classes } = props;
  console.table(...props);
  return (
    <StaticQuery
      query={HEADERLINK_QUERY}
      render={data => (
        <List className={headerLinksStyle.list}>
          {data.wordpressWpApiMenusMenusItems.items.map(item => {
            if (item.wordpress_children) {
              return renderHeaderDropLinks(item);
            } else {
              return renderHeaderLink(item);
            }
          })}
        </List>
      )}
    />
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);

// <ListItem className={headerLinksStyle.listItem} key={item.object_slug}>
//   {/* <Link to={`/${item.object_slug}`} className={headerLinksStyle.listItem}>
//   {item.title}
// </Link> */}
//   <CustomDropdown
//     noLiPadding
//     buttonText={item.object_slug}
//     buttonProps={{
//       className: headerLinksStyle.navLink,
//       color: 'transparent'
//     }}
//     dropdownList={[
//       <Link
//         to={`/${item.object_slug}`}
//         className={headerLinksStyle.dropdownLink}>
//         {item.title}
//       </Link>
//     ]}
//   />
// </ListItem>
