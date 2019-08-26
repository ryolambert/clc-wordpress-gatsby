/* eslint-disable prefer-const */
import React, { PureComponent } from 'react';

export default class componentName extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      currentFilter: 'all',
      allPosts: [...this.props.posts],
      postsByCategory: [],
      renderCategories: false,
      allCategories: {},
      postsByTag: [],
      allTags: {},
      renderTags: false,
    };
  }

  filter = pages => {
    let categories = page.node.categories.name;
    for (let category of categories) {
      if (!allCategories[category]) {
        allCategories[category] = 1;
      } else {
        allCategories[category]++;
      }
    }
    pages.forEach(page => {});

    let tags = page.node.tags.name;
    for (let tag of tags) {
      if (!allTags[tag]) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
  };

  render() {
    return <div></div>;
  }
}
