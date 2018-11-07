import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';
import PropTypes from 'prop-types';
const ReactMarkdown = require('react-markdown');

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = { name: ' ', readme: ' ',  username: ' '};
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    axios
      .get(
        `https://api.github.com/repos/${params.username}/${
          params.repoName
        }/readme`
      )
      .then(info => {
        let url = info.data.download_url;
        axios
          .get(`${url}`)
          .then(res =>
            this.setState(() => ({
              readme: res.data, 
              name: params.repoName,
              username: params.username
            }))
          )
          .catch(err => console.log(err.message));
      })
      .catch(err => console.log(err.message));
  }

  render() {
    return (
      <div>
        <Header history={this.props.history} display={this.state.name} push={`/${this.state.username}/projects`}/>
        <div className="container list">
          <section className="eight offset-by-two columns">
            <br />
            <br />
            <h4>
              <b>{this.state.name}</b>
            </h4>
            <ReactMarkdown source={this.state.readme} />
          </section>
        </div>
      </div>
    );
  }
}

Details.propTypes = {
  match: PropTypes.object.isRequired
};

export default Details;
