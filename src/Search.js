import React from 'react';
import Header from './Header.js';
import PropTypes from 'prop-types';

const Search = (props) => {
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    if (props.onSubmitUsername && username) {
      props.onSubmitUsername(username);
    }
  };
  return (
    <div>
      <Header display={'Search'} search={true}/>
      <div className="container">
        <section className="search six offset-by-three columns">
          <form onSubmit={handleSubmit}>
            <button type="submit">
              <span className="fa fa-check-circle fa-3x" />
            </button>
            <input
              className="u-full-width"
              type="text"
              name="username"
              placeholder="Github Username"
            />
          </form>
        </section>
      </div>
    </div>
  );
};

Search.propTypes = {
  onSubmitUsername: PropTypes.func
};

export default Search;
