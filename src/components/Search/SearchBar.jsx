/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { navigate } from '@reach/router';
import Downshift, { resetIdCounter } from 'downshift';
import { Index } from 'elasticlunr';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import Input from '@material-ui/core/Input';
import {
  DropDown,
  DropDownItem,
  SearchStyles,
} from '../../assets/jss/material-kit-react/components/searchBarStyles';

const SEARCH_QUERY = graphql`
  query($title: String!) {
    siteSearchIndex(title: $title) {
      index
    }
  }
`;

// TODO: Debug Page Search Feature Breaking IOS Page styling
function routeToResult(item) {
  if (item.type === 'post') {
    return navigate(`/post/${item.slug}`);
  }
  if (item.type === 'page') {
    return navigate(`/${item.slug}`);
  }
  return navigate(`/`);
}

// function routeToResult(item) {
//   return navigate(`/post/${item.slug}`);
// }

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ``,
      results: [],
      loading: false,
    };
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
      items: this.index
        .search(query, { expand: true })
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    });
  };

  // onChange = debounce(async (e, client))

  render() {
    const { classes, data } = this.props;
    resetIdCounter();
    return (
      // <div className={classes.searchStyles}>
      <SearchStyles>
        <Downshift onChange={routeToResult}>
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            selectedItem,
            highlightedIndex,
          }) => (
            <div>
              <Input
                style={{ width: '90%', marginTop: '10px' }}
                {...getInputProps({
                  placeholder: '🔍Search',
                  className: this.state.loading ? 'loading' : '',
                  onChange: this.search,
                })}
              />
              {isOpen ? (
                <DropDown style={{ width: '90%' }}>
                  {this.state.items.map((item, index) => {
                    if (item.type === 'post') {
                      return (
                        <DropDownItem
                          {...getItemProps({ item })}
                          key={item.id}
                          highlighted={index === highlightedIndex}
                        >
                          <Link to={`/post/${item.slug}`}>
                            <h5
                              dangerouslySetInnerHTML={{ __html: item.title }}
                            />

                            <p
                              dangerouslySetInnerHTML={{ __html: item.excerpt }}
                            />
                          </Link>
                        </DropDownItem>
                      );
                    }
                    if (item.type === 'page') {
                      return (
                        <DropDownItem
                          {...getItemProps({ item })}
                          key={item.id}
                          highlighted={index === highlightedIndex}
                          inputDisplayTemplate={
                            selectedItem => `${selectedItem.title}`
                            // eslint-disable-next-line react/jsx-curly-newline
                          }
                        >
                          <Link to={`/${item.slug}`}>
                            <h5
                              dangerouslySetInnerHTML={{ __html: item.title }}
                            />
                            <p
                              dangerouslySetInnerHTML={{ __html: item.excerpt }}
                            />
                          </Link>
                        </DropDownItem>
                      );
                    }

                    return (
                      <DropDownItem
                        {...getItemProps({ item })}
                        key={Math.random()}
                        highlighted={index === highlightedIndex}
                      >
                        <Link to={`/${item.slug}`}>
                          <h6>😭Sorry, it seems we couldn't find that! 🤷‍♂️</h6>
                        </Link>
                      </DropDownItem>
                    );
                  })}
                </DropDown>
              ) : null}
            </div>
          )}
        </Downshift>
      </SearchStyles>
    );
  }
}

SearchBar.propTypes = {
  searchIndex: PropTypes.object,
};

export default SearchBar;
