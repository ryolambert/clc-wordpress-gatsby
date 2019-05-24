// //!! HOLD on use
// //^__________________________📃Nested DropDown_______________________________^//
// //todo: 👨‍💻 Find correct design pattern/⚛🎩 best-practices-implementation.
// //? Problem Mapping children of a mapped object
// //⚛ Need to setup a nested array/object mapping function
// //.. 1. Map items
// //.. 2. Map wordpress_children
// //..  2a. If/then logic for items with no children
// // /*eslint-disable*/
// // import React from 'react';
// // // react components for routing our app without refresh
// // import { StaticQuery, graphql, Link } from 'gatsby';

// // // @material-ui/core components
// // import withStyles from '@material-ui/core/styles/withStyles';
// // import List from '@material-ui/core/List';
// // import ListItem from '@material-ui/core/ListItem';
// // import Tooltip from '@material-ui/core/Tooltip';

// // // @material-ui/icons
// // import { Apps, CloudDownload } from '@material-ui/icons';

// // // React icons
// // import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

// // // core components
// // import CustomDropdown from 'components/CustomDropdown/CustomDropdown.jsx';
// // import Button from 'components/CustomButtons/Button.jsx';

// // import headerLinksStyle from 'assets/jss/material-kit-react/components/headerLinksStyle.jsx';

// // const HeaderLinksNested = ({ ...props }) => (
// //   <StaticQuery
// //     query={graphql`
// //       query {
// //         wordpressWpApiMenusMenusItems(name: { eq: "Main Menu" }) {
// //           items {
// //             title
// //             wordpress_children {
// //               title
// //               object_slug
// //             }
// //           }
// //         }
// //       }
// //     `}
// //     render={data => (
// //       <div>
// //         {data.wordpressWpApiMenusMenusItems.items.wordpress_children.map(
// //           child => (
// //             <CustomDropdown
// //               noLiPadding
// //               buttonText={item.title}
// //               buttonProps={{
// //                 className: props.navLink,
// //                 color: 'transparent'
// //               }}
// //               buttonIcon={Apps}
// //               dropdownList={[
// //                 <Link
// //                   to={`/${child.object_slug}`}
// //                   className={props.dropdownLink}>
// //                   {child.title}
// //                 </Link>
// //               ]}
// //             />
// //           )
// //         )}
// //       </div>
// //     )}
// //   />
// // );
// // export default withStyles(headerLinksStyle)(HeaderLinksNested);

// /*eslint-disable*/
// import React from 'react';
// // react components for routing our app without refresh
// import { StaticQuery, graphql, Link } from 'gatsby';

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

// // import { defaultFont } from 'assets/jss/material-kit-react.jsx';

// // import { makeStyles } from '@material-ui/core/styles';
// // import tooltip from 'assets/jss/material-kit-react/tooltipsStyle.jsx';

// // const headerLinksStyle = theme => ({
// //   list: {
// //     ...defaultFont,
// //     fontSize: '14px',
// //     margin: 0,
// //     paddingLeft: '0',
// //     listStyle: 'none',
// //     paddingTop: '0',
// //     paddingBottom: '0',
// //     color: 'inherit'
// //   },
// //   listItem: {
// //     float: 'left',
// //     color: 'inherit',
// //     position: 'relative',
// //     display: 'block',
// //     width: 'auto',
// //     margin: '0',
// //     padding: '0',
// //     [theme.breakpoints.down('sm')]: {
// //       width: '100%',
// //       '&:after': {
// //         width: 'calc(100% - 30px)',
// //         content: '""',
// //         display: 'block',
// //         height: '1px',
// //         marginLeft: '15px',
// //         backgroundColor: '#e5e5e5'
// //       }
// //     }
// //   },
// //   listItemText: {
// //     padding: '0 !important'
// //   },
// //   navLink: {
// //     color: 'inherit',
// //     position: 'relative',
// //     padding: '0.9375rem',
// //     fontWeight: '400',
// //     fontSize: '12px',
// //     textTransform: 'uppercase',
// //     borderRadius: '3px',
// //     lineHeight: '20px',
// //     textDecoration: 'none',
// //     margin: '0px',
// //     display: 'inline-flex',
// //     '&:hover,&:focus': {
// //       color: 'inherit',
// //       background: 'rgba(200, 200, 200, 0.2)'
// //     },
// //     [theme.breakpoints.down('sm')]: {
// //       width: 'calc(100% - 30px)',
// //       marginLeft: '15px',
// //       marginBottom: '8px',
// //       marginTop: '8px',
// //       textAlign: 'left',
// //       '& > span:first-child': {
// //         justifyContent: 'flex-start'
// //       }
// //     }
// //   },
// //   notificationNavLink: {
// //     color: 'inherit',
// //     padding: '0.9375rem',
// //     fontWeight: '400',
// //     fontSize: '12px',
// //     textTransform: 'uppercase',
// //     lineHeight: '20px',
// //     textDecoration: 'none',
// //     margin: '0px',
// //     display: 'inline-flex',
// //     top: '4px'
// //   },
// //   registerNavLink: {
// //     top: '3px',
// //     position: 'relative',
// //     fontWeight: '400',
// //     fontSize: '12px',
// //     textTransform: 'uppercase',
// //     lineHeight: '20px',
// //     textDecoration: 'none',
// //     margin: '0px',
// //     display: 'inline-flex'
// //   },
// //   navLinkActive: {
// //     color: 'inherit',
// //     backgroundColor: 'rgba(255, 255, 255, 0.1)'
// //   },
// //   icons: {
// //     width: '20px',
// //     height: '20px',
// //     marginRight: '3px'
// //   },
// //   socialIcons: {
// //     position: 'relative',
// //     fontSize: '20px !important',
// //     marginRight: '4px'
// //   },
// //   dropdownLink: {
// //     '&,&:hover,&:focus': {
// //       color: 'inherit',
// //       textDecoration: 'none',
// //       display: 'block',
// //       padding: '10px 20px'
// //     }
// //   },
// //   ...tooltip,
// //   marginRight5: {
// //     marginRight: '5px'
// //   }
// // });

// class HeaderLinks extends React.Component {
// render() {
//   const { classes, ...rest } = this.props;
//   const { data } = this.props;
// }
// const renderLink = item => {
//   const { classes } = props;
//   return (
//     <Link to={`/${item.object_slug}`} className={navLink}>
//       {item.title}
//     </Link>
//   );
// };

// const renderHeaderLink = item => {
//   const { classes } = props;
//   if (item.wordpress_children && item.wordpress_children.length) {
//     return renderHeaderDropLinks(item);
//   } else {
//     return (
//       <ListItem className={classes.listItem} key={item.object_slug}>
//         {renderLink(item)}
//       </ListItem>
//     );
//   }
// };

// // const classes =
// const renderDropMap = item => {
//   return (
//     <ListItem>
//       {item.wordpress_children.map(child => (
//         <Link to={`/${child.object_slug}`} className={classes.dropdownList}>
//           {child.title}
//         </Link>
//       ))}
//     </ListItem>
//   );
// };

// const renderHeaderDropLinks = item => {
//   const { classes } = props;
//   return (
//     <ListItem className={classes.listItem} key={item.object_id}>
//       {/* {renderLink(item)} */}
//       <CustomDropdown
//         noLiPadding
//         buttonText={item.object_slug}
//         buttonProps={{
//           className: `{classes.navLink}`,
//           color: 'transparent'
//         }}
//         dropdownList={[
//           // {renderDropMap(item)}
//           <>
//             {item.wordpress_children.map(child => (
//               <Link
//                 to={`/${child.object_slug}`}
//                 className={classes.dropdownList}>
//                 {child.title}
//               </Link>
//             ))}
//           </>
//         ]}
//       />
//     </ListItem>
//   );
// };

// function HeaderLinks({ ...props }) {
//   const { classes } = props;
//   console.table(...props);
//   return (
//     <StaticQuery
//       query={HEADERLINK_QUERY}
//       render={data => {
//         if (data.wordpressWpApiMenusMenusItems.items) {
//           return (
//             <List className={headerLinksStyle.list}>
//               {data.wordpressWpApiMenusMenusItems.items.map(item => {
//                 if (item.wordpress_children) {
//                   return renderHeaderDropLinks(item);
//                 } else {
//                   return renderHeaderLink(item);
//                 }
//               })}
//             </List>
//           );
//         } else {
//           return null;
//         }
//       }}
//     />
//   );
// }

// };

// export const HEADERLINK_QUERY = graphql`
//   fragment menuFields on wordpress__wp_api_menus_menus_items {
//     slug
//     items {
//       title
//       url
//       object_id
//       object_slug
//       wordpress_children {
//         title
//         url
//         object_id
//         object_slug
//       }
//     }
//   }
//   query headerLinkQuery {
//     # about: wordpressWpApiMenusMenusItems(wordpress_id: {eq: 110}) {
//     #   ...menuFields
//     # }
//     # media: wordpressWpApiMenusMenusItems(wordpress_id: {eq: 111}) {
//     #   ...menuFields
//     # }
//     # resources: wordpressWpApiMenusMenusItems(wordpress_id: {eq: 111}) {
//     #   ...menuFields
//     # }
//     wordpressWpApiMenusMenusItems(name: { eq: "Main Menu" }) {
//       ...menuFields
//     }
//   }
// `;

// export default withStyles(headerLinksStyle)(HeaderLinks);

// // <ListItem className={classes.listItem} key={item.object_slug}>
// //   {/* <Link to={`/${item.object_slug}`} className={classes.listItem}>
// //   {item.title}
// // </Link> */}
// //   <CustomDropdown
// //     noLiPadding
// //     buttonText={item.object_slug}
// //     buttonProps={{
// //       className: classes.navLink,
// //       color: 'transparent'
// //     }}
// //     dropdownList={[
// //       <Link
// //         to={`/${item.object_slug}`}
// //         className={classes.dropdownLink}>
// //         {item.title}
// //       </Link>
// //     ]}
// //   />
// // </ListItem>
