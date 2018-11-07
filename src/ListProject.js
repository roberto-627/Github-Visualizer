import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';
import PropTypes from 'prop-types';

class ListProjects extends Component {
  constructor(props) {
    super(props);
    this.state = { projects: [], user:''};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    let name = event.target.id;
    if (this.props.history && name) {
      this.props.history.push(`/${name}/readme`);
    }
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    axios
      .get(`https://api.github.com/users/${params.username}/repos`)
      .then(projects => {
        this.setState(() => ({
          projects: projects.data,
          user: params.username
        }));
      })
      .catch(err => console.log(err.message));
  }

  render() {
    return (
      <div>
        <Header history={this.props.history} display={this.state.user} push={'/'}/>
        <div className="container list">
          <section className="eight offset-by-two columns">
            <br />
            <br />
            <h4>
              <b>Projects</b> 
            </h4>
            <div className="card">
              <ul className="ul" onSubmit={this.handleSubmit}>
                {this.state.projects.map(data => (
                  <li className="card-1" key={data.id}>
                    <a
                      id={`${data.full_name}`}
                      onClick={this.handleClick}
                    >
                      {data.name}
                    </a>
                  </li>
                ))}{' '}
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

ListProjects.propTypes = {
  match: PropTypes.object.isRequired
};

export default ListProjects;
