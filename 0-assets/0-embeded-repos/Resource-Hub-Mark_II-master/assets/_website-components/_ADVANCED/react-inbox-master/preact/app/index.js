import {h, render, Component } from 'preact';
import { Router, Link } from 'preact-router';
import 'preact/devtools';
/** @jsx h */

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
    <a href={`/${id}`} >
      <li className="mdl-list__item mdl-list__item--three-line">
        <span className="mdl-list__item-primary-content">
          <i className="material-icons mdl-list__item-icon">mail</i>
          <span>{title}</span>
          <span className="mdl-list__item-text-body">
            {body}
          </span>
        </span>
      </li>
    </a>
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
    fetch(`http://jsonplaceholder.typicode.com/posts/${this.props.id}`)
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
    return this.state.loading ? <Loader /> : <ListItem {...this.state.mail} />;
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
            <span className="mdl-layout-title">Preact</span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation mdl-layout--large-screen-only">
              <a className="mdl-navigation__link" href='/'>Inbox</a>
              <a className="mdl-navigation__link" href='/about'>About</a>
            </nav>
          </div>
        </header>
        <div className="mdl-layout__drawer">
          <span className="mdl-layout-title">Title</span>
          <nav className="mdl-navigation">
            <Link className="mdl-navigation__link" href='/'>Inbox</Link>
            <Link className="mdl-navigation__link" href='/about'>About</Link>
          </nav>
        </div>
        <main className="mdl-layout__content">
          <div className="page-content">
            <Router>
              <Inbox path="/" />
              <About path="/about" />
              <Mail path="/:id"/>
            </Router>
          </div>
        </main>
      </div>
    );
  }
}

(function(){
  render(
    <App />
    , document.getElementById('inbox-app')
  );
})();
