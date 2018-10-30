import React from "react";
import './Nav.css';

const Nav = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <a className="navbar-brand" href="/">
      NYT React Search
    </a>
    <a className="savedArticles" href="/saved">
      Saved Articles
    </a>
  </nav>
);

export default Nav;
