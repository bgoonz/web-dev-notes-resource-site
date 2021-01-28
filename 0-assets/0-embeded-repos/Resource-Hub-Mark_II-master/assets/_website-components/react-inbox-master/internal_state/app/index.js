import React, { Component } from 'react';
import { render } from 'react-dom';

import {Router, Route, Link, browserHistory} from 'react-router';

class Inbox extends Component {
  constructor() {
    super();
    this.state = {
      mails: [],
      loading: false,
      error: {
        type: '',
        message: ''
      }
    }
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    fetch('http://jsonplaceholder.typicode.com/posts')
      .then(res => {
        return res.json();
      })
      .then(mails => {
        this.setState({
          mails,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false
        });
      })
  }

  render () {
    return (
      <div>
        <ul className="demo-list-icon mdl-list">
          {
            this.state.loading ?
              <Loader />
            :
              this.state.mails.map((mail) => {
                return <ListItem key={mail.id}  {...mail} />;
              })
          }
        </ul>
      </div>
    );
  }
}

const ListItem = ({id, title, body}) => {
  return (
    <Link to={`/inbox/${id}`} >
      <li className="mdl-list__item mdl-list__item--three-line">
        <span className="mdl-list__item-primary-content">
          <i className="material-icons mdl-list__item-icon">mail</i>
          <span>{title}</span>
          <span className="mdl-list__item-text-body">
            {body}
          </span>
        </span>
      </li>
    </Link>
  );
}

const Loader = () => {
  return (
    <div className="mdl-spinner mdl-js-spinner is-active"></div>
  );
}

class Mail extends Component {
  constructor() {
    super();
    this.state = {
      mail: {},
      loading: false,
      error: {
        type: '',
        message: ''
      }
    }
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    fetch(`http://jsonplaceholder.typicode.com/posts/${this.props.params.id}`)
      .then(res => {
        return res.json();
      })
      .then(mail => {
        this.setState({
          mail,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false
        });
      })
  }
  render() {
    return this.state.loading ? <Loading /> : <ListItem {...this.state.mail} />;
  }
}

class About extends Component {
  render () {
    return (
      <div>
        <h1> About </h1>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">Title</span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation mdl-layout--large-screen-only">
              <Link className="mdl-navigation__link" to='/'>Inbox</Link>
              <Link className="mdl-navigation__link" to='/about'>About</Link>
            </nav>
          </div>
        </header>
        <div className="mdl-layout__drawer">
          <span className="mdl-layout-title">Title</span>
          <nav className="mdl-navigation">
            <Link className="mdl-navigation__link" to='/'>Inbox</Link>
            <Link className="mdl-navigation__link" to='/about'>About</Link>
          </nav>
        </div>
        <main className="mdl-layout__content">
          <div className="page-content">
            {this.props.children ? this.props.children : <Inbox />}
          </div>
        </main>
      </div>
    );
  }
}

(function(){
  render(
    <Router history={browserHistory} >
      <Route path="/" component={App} >
        <Route path="/inbox" component={Inbox} />
        <Route path="/inbox/:id" component={Mail} />
        <Route path="/about" component={About} />
      </Route>
    </Router>
    , document.getElementById('inbox-app')
  );
})();
