// //*_____________________________Search Component______________________________*/
// import React from 'react';
// import PropTypes from 'prop-types';
// import { Index } from 'elasticlunr';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import SearchInput from './SearchInput.jsx';
// import withStyles from '@material-ui/core/styles/withStyles';
// import { Link } from 'gatsby';
// import headerLinksStyle from 'assets/jss/material-kit-react/components/headerLinksStyle.jsx';

// // Search component
// class Search extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       query: ``,
//       results: []
//     };
//   }

//   render() {
//     const { classes } = this.props;
//     const displayTemplate = this.props;
//     // let { reusults } = this.state.results;
//     // const { data } = this.state.results;
//     //todo: !! Present issue is with figuring out how to properly pass props to displayTemplate as strings... instead of an object. Need to solve how to break up this.state.results into strings for displayTemplate to consume.
//     return (
//       <div>
//         <SearchInput
//           //This is the list of data that is databound to the combobox
//           items={this.state.results}
//           //This is a template that can be overridden for each list item
//           displayTemplate={displayTemplate}
//           //This is the label that appears atop the input
//           label={'Search by Synthesizer'}
//           //This is placeholder text when the input has focus
//           placeholder={'begin typing ..'}
//           // This affects the search behavior
//           // Maybe what you search is different from just
//           // one single prop.
//           // so this is how one might search across many properties
//           searchTemplate={item => `${item.title} ${item.excerpt}`}
//           // Currently a noop, but you can fire an event
//           // as a side effect each time the input changes
//           onChangeInput={event => {}}
//           // This controls what you see in the actual input
//           // when an item is selected
//           inputDisplayTemplate={selectedItem => `${selectedItem.name}`}
//           //This event fires every time there are state changes inside the Combobox
//           onStateChange={({
//             highlightedIndex,
//             inputValue,
//             isOpen,
//             selectedItem
//           }) => {
//             //Uncomment this, if you'd like to track the state changes in the console.
//             /*
//               console.log('highlightedIndex',highlightedIndex);
//               console.log('inputValue',inputValue);
//               console.log('isOpen',isOpen);
//               console.log('selectedItem',selectedItem)
//               */
//           }}
//           // This (very important) event fires everytime a new item in the combobox
//           // Is selected
//           onChange={({ selectedItem, previousItem }) => {
//             this.setState({
//               synth: selectedItem,
//               listening: false
//             });
//           }}
//         />
//         <div className={classes.List}>
//           <input
//             className={classes.dropDownLink}
//             style={{
//               position: `relative`
//             }}
//             type="text"
//             placeholder="Type title words or tags"
//             value={this.state.query}
//             onChange={this.search}
//           />
//           <List
//             className={classes.list}
//             style={{
//               position: `absolute`,
//               backgroundColor: `warningColor`,
//               marginLeft: `0`,
//               width: `200px`,
//               height: `600px`,
//               overflowY: `scroll`
//             }}>
//             <ListItem className={classes.listItem}>
//               {this.state.results.map(post => (
//                 <Link className={classes.navLink} to={`/post/` + post.slug}>
//                   {post.title}{' '}
//                 </Link>
//               ))}
//             </ListItem>
//           </List>
//         </div>
//       </div>
//     );
//   }

//   getOrCreateIndex = () =>
//     this.index
//       ? this.index
//       : // Create an elastic lunr index and hydrate with graphql query results
//         Index.load(this.props.searchIndex);

//   search = evt => {
//     const query = evt.target.value;
//     this.index = this.getOrCreateIndex();
//     this.setState({
//       query,
//       // Query the index with search string to get an [] of IDs
//       results: this.index
//         .search(query, { expand: true })
//         // Map over each ID and return the full document
//         .map(({ ref }) => this.index.documentStore.getDoc(ref))
//     });
//   };
// }

// Search.propTypes = {
//   searchIndex: PropTypes.object
// };

// export default withStyles(headerLinksStyle)(Search);

//*_____________________________Search Component______________________________*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Index } from 'elasticlunr';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CustomDropdownSearch from 'components/CustomDropdown/CustomDropdownSearch.jsx';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'gatsby';
import headerLinksStyle from 'assets/jss/material-kit-react/components/headerLinksStyle.jsx';

const SEARCH_POSTS_QUERY = graphql`
  query($title: String!) {
    siteSearchIndex(title: $title) {
      index
    }
  }
`;

// Search component
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ``,
      results: []
    };
  }

  render() {
    const { classes } = this.props;
    // let { results } = this.state.results;
    return (
      <div className={classes.List}>
        <input
          className={classes.dropDownLink}
          style={{
            position: `relative`
          }}
          type="text"
          placeholder="Type title words or tags"
          value={this.state.query}
          onChange={this.search}
        />
        <List
          className={classes.list}
          style={{
            position: `absolute`,
            backgroundColor: `warningColor`,
            marginLeft: `0`
            // width: `200px`,
            // height: `600px`,
            // overflowY: `scroll`
          }}>
          <ListItem className={classes.listItem}>
            {this.state.results.map(post => (
              <Link className={classes.navLink} to={`/post/` + post.slug}>
                {post.title}{' '}
              </Link>
            ))}
          </ListItem>
        </List>
      </div>
    );
  }

  getOrCreateIndex = () =>
    this.index
      ? this.index
      : // Create an elastic lunr index and hydrate with graphql query results
        Index.load(this.props.searchIndex);

  search = evt => {
    const query = evt.target.value;
    this.index = this.getOrCreateIndex();
    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: this.index
        .search(query, { expand: true })
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref))
    });
  };
}

Search.propTypes = {
  searchIndex: PropTypes.object
};

export default withStyles(headerLinksStyle)(Search);
