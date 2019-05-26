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
  const comma = ',';
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
                    dropdownList={
                      // <Link
                      //   to={`/${item.object_slug}`}
                      //   className={classes.dropdownLink}>
                      //   {item.title}
                      // </Link>,

                      //todo: ⚠ Solve way to add in , after each generated subMenu "<Link />,"
                      //! Figure out why styling is coloring gray on hover
                      renderDropMap(item, props)
                    }
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
// /*eslint-disable*/
// import React from 'react';
// // react components for routing our app without refresh
// import { Link } from 'gatsby';

// // @material-ui/core components
// import withStyles from '@material-ui/core/styles/withStyles';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import Tooltip from '@material-ui/core/Tooltip';

// // @material-ui/icons
// import { Apps, CloudDownload } from '@material-ui/icons';

// // React icons
// import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

// // core components
// import CustomDropdown from 'components/CustomDropdown/CustomDropdown.jsx';
// import Button from 'components/CustomButtons/Button.jsx';

// import headerLinksStyle from 'assets/jss/material-kit-react/components/headerLinksStyle.jsx';

// function HeaderLinks({ ...props }) {
//   const { classes } = props;
//   return (
//     <List className={classes.list}>
//       <ListItem className={classes.listItem}>
//         <CustomDropdown
//           noLiPadding
//           buttonText="Components"
//           buttonProps={{
//             className: classes.navLink,
//             color: 'transparent'
//           }}
//           buttonIcon={Apps}
//           dropdownList={[
//             <Link to="/" className={classes.dropdownLink}>
//               All components
//             </Link>,
//             <a
//               href="https://creativetimofficial.github.io/material-kit-react/#/documentation"
//               target="_blank"
//               className={classes.dropdownLink}>
//               Documentation
//             </a>
//           ]}
//         />
//       </ListItem>
//       <ListItem className={classes.listItem}>
//         <Button
//           href="https://www.creative-tim.com/product/material-kit-react"
//           color="transparent"
//           target="_blank"
//           className={classes.navLink}>
//           <CloudDownload className={classes.icons} /> Download
//         </Button>
//       </ListItem>
//       <ListItem className={classes.listItem}>
//         <Tooltip
//           id="instagram-twitter"
//           title="Follow us on twitter"
//           placement={
//             typeof window !== 'undefined' && window.innerWidth > 959
//               ? 'top'
//               : 'left'
//           }
//           classes={{ tooltip: classes.tooltip }}>
//           <Button
//             href="https://twitter.com/CreativeTim"
//             target="_blank"
//             color="transparent"
//             className={classes.navLink}>
//             <FaTwitter />
//           </Button>
//         </Tooltip>
//       </ListItem>
//       <ListItem className={classes.listItem}>
//         <Tooltip
//           id="instagram-facebook"
//           title="Follow us on facebook"
//           placement={
//             typeof window !== 'undefined' && window.innerWidth > 959
//               ? 'top'
//               : 'left'
//           }
//           classes={{ tooltip: classes.tooltip }}>
//           <Button
//             color="transparent"
//             href="https://www.facebook.com/CreativeTim"
//             target="_blank"
//             className={classes.navLink}>
//             <FaFacebook />
//           </Button>
//         </Tooltip>
//       </ListItem>
//       <ListItem className={classes.listItem}>
//         <Tooltip
//           id="instagram-tooltip"
//           title="Follow us on instagram"
//           placement={
//             typeof window !== 'undefined' && window.innerWidth > 959
//               ? 'top'
//               : 'left'
//           }
//           classes={{ tooltip: classes.tooltip }}>
//           <Button
//             color="transparent"
//             href="https://www.instagram.com/CreativeTimOfficial"
//             target="_blank"
//             className={classes.navLink}>
//             <FaInstagram />
//           </Button>
//         </Tooltip>
//       </ListItem>
//     </List>
//   );
// }

// export default withStyles(headerLinksStyle)(HeaderLinks);
