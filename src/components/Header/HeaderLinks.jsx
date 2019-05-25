/*eslint-disable*/
import React from 'react';
// react components for routing our app without refresh
import { StaticQuery, graphql, Link } from 'gatsby';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import MenuList from '@material-ui/core/MenuList';

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

// const renderLink = item => {
//   return (
//     <ListItem className="navLink">
//       <Link to={`/${item.object_slug}`}>{item.title}</Link>
//     </ListItem>
//   );
// };

function renderHeaderLink(item, props) {
  const { classes } = props;
  return (
    <ListItem className={classes.listItem} key={item.object_slug}>
      {/* <Button color="transparent" className={classes.navLink}> */}
      <Link to={`/${item.object_slug}`} className={classes.navLink}>
        {item.title}
      </Link>
      {/* </Button> */}
    </ListItem>
  );
}

// const renderDropMap = item, ({...props}) => {
//   const { classes} = props;
//   const item = props.data.wordpressWpApiMenusMenusItems.items;
//   return item.wordpress_children.map(child => (
//     <Link to={`/${child.object_slug}`} className={classes.dropdownLink}>
//       {child.title}
//     </Link>
//   ));
// };

function renderDropMap(item, props) {
  const { classes } = props;
  return item.wordpress_children.map(child => (
    <Link to={`/${child.object_slug}`} className={classes.dropdownLink}>
      {child.title}
    </Link>
  ));
}

// const renderHeaderDropLinks = item => {
//   return (
//     <ListItem className="listItem" key={item.object_slug}>
//       <CustomDropdown
//         noLiPadding
//         buttonText={item.object_slug}
//         buttonProps={{
//           className: 'navLink',
//           color: 'transparent'
//         }}
//         dropdownList={[
//           <ListItem>
//             {renderLink(item)}
//             {item.wordpress_children.map(child => (
//               <Link
//                 to={`/${child.object_slug}`}
//                 className={classes.dropdownLink}>
//                 {child.title}
//               </Link>
//             ))}
//           </ListItem>
//         ]}
//       />
//     </ListItem>
//   );
// };

function HeaderLinks({ ...props }) {
  const { classes } = props;
  console.table(...props);
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
                    buttonText={item.object_slug}
                    buttonProps={{
                      className: classes.navLink,
                      color: 'transparent'
                    }}
                    dropdownList={[
                      <Link
                        to={`/${item.object_slug}`}
                        className={classes.dropdownLink}>
                        {item.title}
                      </Link>,
                      renderDropMap(item, props)
                    ]}
                  />
                </ListItem>
              );
            } else {
              return renderHeaderLink(item, props);
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
