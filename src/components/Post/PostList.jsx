/* eslint-disable react/no-danger */
/* eslint-disable no-useless-return */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-restricted-globals */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
import React, { PureComponent } from 'react';
import { Link, navigate } from 'gatsby';
import Img from 'gatsby-image';
import Layout from 'components/Layout/Layout.js';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import ParallaxLazy from 'components/Parallax/ParallaxLazy.jsx';
import Post from './Post';

export default class componentName extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      currentFilter: 'all',
      allPosts: [...this.props.posts],
      blog: [],
      events: [],
      sermons: [],
      // postsByCategory: [],
      allCategories: {},
      postsByTag: [],
      allTags: {},
      renderTags: false,
    };
  }

  componentDidMount() {
    // Filter pages by category & tags
    this.filter(this.props.posts);
    if (this.props.filterCategoriesAndTagsFromURLParams === true) {
      // Read categories from URL param
      this.handleURLParamsCategoryAndTag();
    }
  }

  filter = pages => {
    let allCategories = {};
    let allTags = {};

    // ? Use for generating pages based on category data
    let categories = page.node.categories.name;
    pages.forEach(page => {
      categories.forEach(category => {
        // eslint-disable-next-line no-unused-expressions
        allCategories[category.push(page)];
      });
    });

    // // Page sort by Category
    // switch (page.node.categories.name) {
    //   case 'Blog':
    //     blog.push(page);
    //     break;
    //   case 'Events':
    //     events.push(page);
    //     break;
    //   case 'Sermons':
    //     sermons.push(page);
    //     break;
    //   default:
    //     break;
    // }

    // Make list of tags with # of occurrences
    let tags = page.node.tags.name;
    tags.forEach(tag => {
      if (!allTags[tag]) {
        allTags[tag] = 1;
      } else {
        allTags[tag] += 1;
      }
    });

    this.setState({
      allCategories,
      allTags,
    });
  };

  filterByTag = tag => {
    let results = [];
    results = this.state.allPosts.filter(post => {
      if (post.node.tags.name.includes(tag)) {
        return post;
      }
    });
    return results;
  };

  handleCategoryFilterClick = e => {
    // Filter posts
    this.setState({
      currentFilter: e.target.dataset.filter,
    });

    // Updates URL slug/params
    if (this.props.filterCategoriesAndTagsFromURLParams === true) {
      // Affixes new slug for filtered results
      let searchParams = new URLSearchParams(
        `category=${e.target.dataset.filter}`,
      );
      navigate(`${location.pathname}?${searchParams.toString()}`);
    }
  };

  handleTagClick = e => {
    // Query Tag
    let tagQuery = e.target.dataset.filter;
    let postsByTag = this.filteredByTag(tagQuery);
    // Filter Posts
    this.setState({
      postsByTag,
      currentFilter: 'byTag',
    });

    // Update URL slug/params
    if (this.props.filterCategoriesAndTagsFromURLParams === true) {
      // Affixes new slug for filtered results
      let searchParams = new URLSearchParams(`tags=${e.target.dataset.filter}`);
      navigate(`${location.pathname}?${searchParams.toString()}`);
    }
  };

  handleSearch = e => {
    // Bool Eval on query event (if query then set search state)
    let query = e && e.target ? e.target.query : this.state.search;
    let { posts } = this.props;
    let lowerCaseQuery = query.toLowerCase();

    if (typeof query === 'undefined') return;
    const searchResults = posts.filter(post => {
      // Pattern matching by title, excerpt, tags, category, and path
      if (
        post.node.title.toLowerCase().includes(lowerCaseQuery) ||
        post.node.excerpt.toLowerCase().includes(lowerCaseQuery) ||
        post.node.tags.name
          .toString()
          .toLowerCase()
          .includes(lowerCaseQuery) ||
        post.node.categories.name
          .toString()
          .toLowerCase()
          .includes(lowerCaseQuery) ||
        post.node.slug.toLowerCase().includes(lowerCaseQuery)
      ) {
        return post;
      }
      return null;
    });

    this.setState({
      search: query,
      allPosts: searchResults,
      currentFilter: 'all',
    });
  };

  handleURLParamsCategoryAndTag = () => {
    // Set search params from URL
    let searchParams = new URLSearchParams(window.location.search);
    // Set category param
    let category = searchParams.get('category');
    // Set tag param
    let tag = searchParams.get('tag');

    // Set state filter from URL Param
    if (category && allCategories.includes(category)) {
      this.setState({
        currentFilter: category,
      });
    } else if (tag) {
      let postsByTag = this.filterByTag(tag);
      this.setState({
        currentFilter: 'byTag',
        postsByTag,
      });
    } else {
      return;
    }
  };

  render() {
    const {
      allPosts,
      allCategories,
      allTags,
      currentFilter,
      postsByTag,
      blog,
      events,
      sermons,
      search,
      renderTags,
    } = this.state;

    const {
      showCategories,
      showArrow,
      showImage,
      showSearch,
      showTags,
    } = this.props;

    // TODO: Refactor for complete coverage with generic category titles/descr.
    const bannerByFilter = {
      all: {
        title: this.props.node.acf.all_title || '',
        subTitle: this.props.node.acf.all_description || '',
      },
      blog: {
        title: this.props.node.blog_title || '',
        subTitle: this.props.node.acf.blog_description || '',
      },
      events: {
        title: this.props.node.acf.events_title || '',
        subTitle: this.props.node.acf.events_description || '',
      },
      sermons: {
        title: this.props.node.acf.sermons_title || '',
        subTitle: this.props.node.acf.sermons_description || '',
      },
    };

    const bannerDefault = {
      title: this.props.node.acf.blog_page_title || '',
      subTitle: this.props.node.acf.blog_page_subtitle || '',
    };

    let banner = bannerByFilter[currentFilter] || bannerDefault;
    return (
      <Layout>
        <ParallaxLazy small filter fluid={fluid} banner={banner} />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <GridContainer justify="center">
            <GridItem xs={11} sm={10} md={8}>
              {showCategories === true && (
                <div className="category-container">
                  {allCategories.map(({ category }) => (
                    <Button
                      color="primary"
                      size="md"
                      onClick={this.handleCategoryFilterClick}
                      data-filter={`${category}`}
                    >
                      `${category}`
                    </Button>
                  ))}
                </div>
              )}
            </GridItem>
          </GridContainer>
          <GridContainer justify="center">
            {/* {group.map(({ node }) => ())} */}
          </GridContainer>
          <GridContainer justify="center">
            <GridItem xs={11} sm={10} md={8}></GridItem>
          </GridContainer>
        </div>
      </Layout>
    );
  }
}
