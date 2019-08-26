import React from 'react';
import { Link } from 'gatsby';
import withStyles from '@material-ui/core/styles/withStyles';

import SearchBarBlog from '../Search/SearchBarBlog';
import postCategoriesNavStyle from '../../assets/jss/material-kit-react/components/postCategoriesNavStyle.jsx';

const PostCategoriesNav = ({ categories, enableSearch }) => (
  <div className="PostCategoriesNav">
    <Link className="NavLink" exact="true" to="/posts/">
      All
    </Link>
    {categories.map((category, index) => (
      <Link
        exact="true"
        className="NavLink"
        key={category.title + index}
        to={category.slug}
      >
        {category.title}
      </Link>
    ))}

    {enableSearch && <SearchBarBlog />}
  </div>
);

export default PostCategoriesNav;
