import React from 'react';
import { navigate } from '@reach/router';
import Downshift, { resetIdCounter } from 'downshift';
import { Index } from 'elasticlunr';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Input from '@material-ui/core/Input';
import {
  DropDown,
  DropDownItem,
  SearchStyles
} from '../../assets/jss/material-kit-react/components/searchBarStyles';

const SEARCH_QUERY = graphql`
  query($title: String!) {
    siteSearchIndex(title: $title) {
      index
    }
  }
`;

function routeToResult(item) {
  if (item.type === 'post') {
    return navigate(`/post/${item.slug}`);
  } else if (item.type === 'page') {
    return navigate(`/${item.slug}`);
  } else {
    return navigate(`/`);
  }
  return console.table({ item });
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ``,
      results: [],
      loading: false
    };
  }

  // onChange = debounce(async (e, client))
  render() {
    const { classes, data } = this.props;
    resetIdCounter();
    return (
      // <div className={classes.searchStyles}>
      <SearchStyles>
        <Downshift
          onChange={routeToResult}
          itemToString={item => (item === null ? '' : item.title)}>
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            selectedItem,
            highlightedIndex
          }) => (
            <div>
              <Input
                style={{ width: '100%', color: 'inherit' }}
                {...getInputProps({
                  placeholder: '🔍Ask & Ye Shall Receive',
                  className: this.state.loading ? 'loading' : '',
                  value: this.state.query,
                  onChange: this.search
                })}
              />
              {isOpen ? (
                <DropDown>
                  {this.state.items.map((item, index) => {
                    if (item.type === 'post') {
                      return (
                        <DropDownItem
                          {...getItemProps({ item })}
                          key={item.id}
                          highlighted={index === highlightedIndex}>
                          <Link to={`/post/` + item.slug}>
                            <h6>{item.title}</h6>
                            <p
                              dangerouslySetInnerHTML={{ __html: item.excerpt }}
                            />
                          </Link>
                        </DropDownItem>
                      );
                    } else if (item.type === 'page') {
                      return (
                        <DropDownItem
                          {...getItemProps({ item })}
                          key={item.id}
                          highlighted={index === highlightedIndex}>
                          <Link to={`/` + item.slug}>
                            <h6>{item.title}</h6>
                            <p
                              dangerouslySetInnerHTML={{ __html: item.exceprt }}
                            />
                          </Link>
                        </DropDownItem>
                      );
                    } else {
                      return <p>Hmm, maybe try something else 🤷‍♂</p>;
                    }
                  })}
                </DropDown>
              ) : null}
            </div>
          )}
        </Downshift>
      </SearchStyles>
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
      items: this.index
        .search(query, { expand: true })
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref))
    });
  };
}

SearchBar.propTypes = {
  searchIndex: PropTypes.object
};

export default SearchBar;
