/* eslint-disable prefer-const */
// @ts-check
import React, { PureComponent } from 'react';
import { Link, navigate } from 'gatsby';
import Img from 'gatsby-image';

// nodejs library that concatenates classes
import classNames from 'classnames';

import Input from '@material-ui/core/Input';
import withStyles from '@material-ui/core/styles/withStyles';
import postsIndexPageStyle from '../../assets/jss/material-kit-react/views/postsIndexPageStyle';
import Layout from '../Layout/Layout.js';
import GridContainer from '../Grid/GridContainer.jsx';
import GridItem from '../Grid/GridItem.jsx';
import Button from '../CustomButtons/Button.jsx';
import ParallaxLazy from '../Parallax/ParallaxLazy.jsx';
import Post from './Post';

class PostList extends PureComponent {
  /**
   * @param {any} props
   */
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      currentFilter: 'all',
      postResults: [...this.props.posts],
      blog: [],
      events: [],
      sermons: [],
      uncategorized: [],
      // postsByCategory: [],
      allCategories: {},
      tagResults: [],
      allTags: {},
      renderTags: false,
      tagProps: [...this.props.tags],
    };
  }

  componentDidMount() {
    // Filter pages by category & tags
    this.filterPosts(this.props.posts);
    if (this.props.filterCategoriesAndTagsFromURLParams === true) {
      // Read categories from URL param
      this.handleURLParamsCategoryAndTag();
    }
  }

  /**
   * @param {{ forEach: (arg0: (page: any) => void) => void; }} pages
   */
  filterPosts = pages => {
    const allCategories = {};
    const blog = [];
    const events = [];
    const sermons = [];
    const uncategorized = [];
    const allTags = {};

    // ? Use for generating pages based on category data
    /**
     * @param {{ node: { categories: any; tags: any; }; }} page
     */
    pages.forEach(page => {
      const { categories, tags } = page.node;
      // Sort the pages by category
      switch (categories[0].name) {
        case 'Blog':
          blog.push(page);
          break;
        case 'Events':
          events.push(page);
          break;
        case 'Sermons':
          sermons.push(page);
          break;
        case 'Uncategorized':
          uncategorized.push(page);
          break;
        default:
          break;
      }

      // Create a list of all tags and the amount of occurrences they have
      if (tags !== null) {
        for (const tag of tags) {
          if (!allTags[tag.name]) {
            allTags[tag.name] = 1;
          } else {
            allTags[tag.name]++;
          }
        }
      } else {
        return;
      }
    });

    this.setState({
      blog,
      events,
      sermons,
      uncategorized,
      allCategories,
      allTags,
    });
  };

  // i6~ks$F:LB\Hb)ry7)R8j3R+HFz,
  /**
   * @param {any} tag
   */
  filterByTag = tag => {
    let results = [];
    results = this.state.postResults.filter(post => {
      if (post.node.tags !== null) {
        const /**
           * @param {{ name: any; }} postTag
           */
          tags = post.node.tags.map(postTag => postTag.name);
        if (tags.includes(tag)) {
          console.log(
            '%c fitlerByTag Post Return Check ',
            'color: black; font-weight: bold; background: orange;'
          );
          console.log(post);
          return post;
        }
      }
    });
    return results;
  };

  /**
   * @param {{ target: { dataset: { filter: any; }; }; }} e
   */
  handleCategoryClick = e => {
    // Filter posts
    this.setState({
      currentFilter: e.target.dataset.filter,
    });

    // Updates URL slug/params
    if (this.props.filterCategoriesAndTagsFromURLParams === true) {
      // Affixes new slug for filtered results
      const searchParams = new URLSearchParams(
        `category=${e.target.dataset.filter}`
      );
      navigate(`${location.pathname}?${searchParams.toString()}`);
    }
  };

  /**
   * @param {{ target: { dataset: { filter: any; }; }; }} e
   */
  handleTagClick = e => {
    // Query Tag
    const tagQuery = e.target.dataset.filter;
    const tagResults = this.filterByTag(tagQuery);

    // Filter Posts
    this.setState({
      tagResults,
      currentFilter: 'byTag',
    });

    // Updates URL slug/params
    if (this.props.filterCategoriesAndTagsFromURLParams === true) {
      // Affixes new slug for filtered results
      const searchParams = new URLSearchParams(
        `tag=${e.target.dataset.filter}`
      );
      navigate(`${location.pathname}?${searchParams.toString()}`);
    }
  };

  handleSearch = e => {
    let value = e && e.target ? e.target.value : this.state.search;
    let { posts } = this.props;
    // let filteredPosts = posts.filter(post => {
    //   if (post.node.tags !== null) {
    //     /**
    //      * @param {{ name: any; }} tag
    //      */
    //     const tagsFilter = post.node.tags.filter(tag => tag.name);
    //     const filtered = tagsFilter.map(tag => tag.name);
    //     // console.log(filtered);
    //     return filtered;
    //   } else {
    //     return;
    //   }
    // });
    // const filteredTagPosts = filteredPosts.map(post =>
    //   post.node.tags.map(tag => tag.name)
    // );
    if (typeof value === 'undefined') return;

    const searchResults = posts.filter(post => {
      // const filteredTags =
      //   post.node.tags !== null
      //     ? post.node.tags.filter(tag => tag.name)
      //     : 'untagged';
      // const tagPosts = filteredTags.map(tag => tag.name);
      // TODO : Remap tags from Array of Objects [{name: "tag name"}] to Array of key values ["tag 1", "tag 2", "tag 3"]
      // Match search in title, excerpt, category, tag, slug
      const query = value.toLowerCase();
      const tagNameArr =
        post.node.tags !== null
          ? Object.values(post.node.tags.map(tag => tag.name))
          : 'untagged';
      if (
        post.node.title.toLowerCase().includes(query) ||
        post.node.excerpt.toLowerCase().includes(query) ||
        tagNameArr.includes(query) ||
        post.node.categories[0].name.toLowerCase().includes(query) ||
        post.node.slug.toLowerCase().includes(query)
      ) {
        return post;
      } else {
        return null;
      }
    });

    this.setState({
      search: value,
      postResults: searchResults,
      currentFilter: 'all',
    });
  };

  handleURLParamsCategoryAndTag = () => {
    // Set search params from URL
    const searchParams = new URLSearchParams(window.location.search);
    const { categories } = this.props;
    /**
     * @type [string] array of filtered category names
     * @param {{ node: { name: { toLowerCase: () => void; }; }; }} cat
     */
    const categoriesArr =
      /**
       * @param {any} i Category being iterated
       * @param {number} index Of iterated index
       */
      categories
        .filter((i, index) => index < 3)
        .map(cat => cat.node.name.toLowerCase());
    // Set category param
    const category = searchParams.get('category');
    // Set tag param
    const tag = searchParams.get('tag');

    // Set state filter from URL Param
    if (category && categoriesArr.includes(category)) {
      this.setState({
        currentFilter: category,
      });
    } else if (tag) {
      const tagResults = this.filterByTag(tag);
      this.setState({
        tagResults,
        currentFilter: 'byTag',
      });
    } else {
      console.log('handleURLParamsCat&Tag 🏁');
      return;
    }
  };

  render() {
    const {
      allCategories,
      allTags,
      blog,
      events,
      sermons,
      uncategorized,
      currentFilter,
      postResults,
      tagResults,
      renderTags,
      search,
    } = this.state;

    const {
      classes,
      categories,
      fluid,
      fallBackParallax,
      showArrow,
      showCategories,
      showImage,
      showSearch,
      showTags,
      tags,
    } = this.props;

    // TODO: Refactor for complete coverage with generic category titles/descr.
    const bannerByFilter = {
      all: {
        title: 'All Content 🙌',
        subTitle: this.props.categories[0].node.description || '',
      },
      blog: {
        title: this.props.categories[0].node.name || '',
        subTitle: this.props.categories[0].node.description || '',
      },
      events: {
        title: this.props.categories[1].node.name || '',
        subTitle: this.props.categories[1].node.description || '',
      },
      sermons: {
        title: this.props.categories[2].node.name || '',
        subTitle: this.props.categories[2].node.description || '',
      },
    };

    const bannerDefault = {
      title: 'Blog',
      subTitle: 'Blog Default Description',
    };

    const banner = bannerByFilter[currentFilter] || bannerDefault;
    console.log(
      '%c State Console Check ',
      'font-size: 15; font-weight: bold; font-style: italic; color: black; background: linear-gradient(to right, #fceabb, #f8b500);'
    );
    console.log(this.state);
    return (
      <Layout>
        <ParallaxLazy small filter fluid={fluid} banner={banner} />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <GridContainer justify="center">
            {showSearch === true && (
              <>
                <GridItem xs={11} sm={10} md={8}>
                  <Input
                    style={{ width: '100%', margin: '1rem auto' }}
                    placeholder="🔍Search"
                    className={this.state.loading ? 'loading' : ''}
                    onChange={this.handleSearch}
                    type="text"
                    onKeyDown={e => {
                      if (e.keyCode === 27) {
                        /**
                         * @param {any} e
                         */
                        this.setState({ search: '' }, e =>
                          this.handleSearch(e)
                        );
                        // reset any query params from the page url
                        navigate(`${location.pathname}`);
                      }
                    }}
                    value={search}
                    aria-label="Search"
                  />
                </GridItem>
              </>
            )}
            <GridItem xs={11} sm={10} md={8}>
              {showCategories === true && (
                <div
                  className="category-container"
                  style={{ marginBottom: '1rem' }}
                >
                  {/**
                   * @param {{ node: { id: React.ReactText; name: { toLowerCase: { (): void; (): void; }; }; }; }} category
                   */}
                  {/**
                   * @param {any} i
                   * @param {number} index
                   */
                  categories
                    .filter((i, index) => index < 3)
                    .map(category => (
                      <Button
                        key={category.node.id}
                        className={`category all ${
                          currentFilter === 'all' ? 'active' : ''
                        }`}
                        color="primary"
                        component="button"
                        round
                        size="sm"
                        data-filter={category.node.name.toLowerCase()}
                        onClick={this.handleCategoryClick}
                      >
                        <span
                          data-filter={category.node.name.toLowerCase()}
                        >{`${category.node.name}`}</span>
                      </Button>
                    ))}
                </div>
              )}
              {/* <>
                <em style={{ borderBottom: '1px solid black' }}>
                  {banner.subTitle}
                </em>
                <hr />
              </> */}
              {showTags === true && (
                <div>
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={e => {
                      e.preventDefault;
                      /**
                       * @param {{ renderTags: any; }} prevState
                       */
                      this.setState(prevState => ({
                        renderTags: !prevState.renderTags,
                      }));
                    }}
                  >
                    {renderTags ? 'Select a tag:' : 'Filter by tag'}
                  </a>
                  {renderTags && (
                    <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
                      {Object.keys(allTags).map((item, i) => (
                        <span
                          data-filter={item}
                          className="post-preview-tag"
                          style={{
                            whiteSpace: 'nowrap',
                            margin: '0.25rem',
                            wordBreak: 'keep-all',
                            wordSpacing: 'normal',
                          }}
                          key={i}
                          role="button"
                          tabIndex={0}
                          onClick={this.handleTagClick}
                          onKeyDown={e => {
                            if (e.keyCode === 13) {
                              this.handleTagClick(e);
                            }
                          }}
                        >
                          #{item} ({allTags[item]})
                        </span>
                      ))}
                    </div>
                  )}
                  <hr />
                </div>
              )}
            </GridItem>
          </GridContainer>
          <GridContainer justify="center">
            {currentFilter === 'all' && postResults
              ? postResults.map(post => (
                  <Post
                    key={post.node.id}
                    post={post}
                    fallBack={fallBackParallax}
                    showArrow={showArrow}
                    showImage={showImage}
                    handleTagClick={this.handleTagClick}
                    handleCategoryClick={this.handleCategoryClick}
                  />
                ))
              : // Tag Filter
              currentFilter === 'byTag' && tagResults
              ? tagResults.map(post => (
                  <Post
                    key={post.node.id}
                    post={post}
                    fallBack={fallBackParallax}
                    showArrow={showArrow}
                    showImage={showImage}
                    handleTagClick={this.handleTagClick}
                    handleCategoryClick={this.handleCategoryClick}
                  />
                ))
              : // Category Filter
                /**
                 * @param {{ node: { id: React.ReactText; }; }} post
                 */
                currentFilter !== 'all' &&
                currentFilter !== 'byTag' &&
                this.state[currentFilter].map(post => (
                  <Post
                    key={post.node.id}
                    post={post}
                    fallBack={fallBackParallax}
                    showArrow={showArrow}
                    showImage={showImage}
                    handleTagClick={this.handleTagClick}
                    handleCategoryClick={this.handleCategoryClick}
                  />
                ))}
          </GridContainer>
          {/* <GridContainer justify="center">
            <GridItem xs={11} sm={10} md={8}></GridItem>
          </GridContainer> */}
        </div>
      </Layout>
    );
  }
}

export default withStyles(postsIndexPageStyle)(PostList);
