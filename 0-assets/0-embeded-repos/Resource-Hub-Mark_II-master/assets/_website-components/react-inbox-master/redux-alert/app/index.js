import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, bindActionCreators, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import { connectAlert, alertReducer } from 'react-redux-alert';

import {Router, Route, Link, browserHistory} from 'react-router';

const initialState = {
  mails: [],
  mail: {},
}

const reducer = function(state=initialState, action) {
  switch(action.type) {
    case 'SET_EMAILS':
      return Object.assign({}, state, {mails: action.mails});
    case 'SET_EMAIL':
      return Object.assign({}, state, {mail: action.mail});
    default:
      return state;
  }
}

const loadMails = function() {
  return (dispatch) => {
    return fetch('http://jsonplaceholder.typicode.com/posts')
      .then(res => {
        return res.json();
      })
      .then(mails => {
        dispatch({
          type: 'SET_EMAILS',
          mails
        });
        return mails;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
}

const loadMail = function(id) {
  return (dispatch) => {
    return fetch(`http://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => {
        return res.json();
      })
      .then(mail => {
        dispatch({
          type: 'SET_EMAIL',
          mail
        });
        return mail;
      })
      .catch(err => {
        console.log(err);
        throw err;
      })
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers({reducer, alertReducer}), composeEnhancers(
  applyMiddleware(thunkMiddleware)
));

class Inbox extends Component {
  constructor() {
    super();
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    this.props.loadMails()
      .then(() => {
        this.setState({
          loading: false
        });
      })
      .catch(() => {
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
              this.props.mails.map((mail) => {
                return <ListItem key={mail.id}  {...mail} />;
              })
          }
        </ul>
      </div>
    );
  }
}

const ListItem = ({id, title, body}) => {
  if(!id) {
    return null;
  }
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
      loading: false,
    }
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    this.props.loadMail(this.props.params.id)
      .then(() => {
        this.setState({
          loading: false
        });
      })
      .catch(() => {
        this.setState({
          loading: false
        });
      })
  }
  render() {
    return this.state.loading ? <Loader /> : <ListItem {...this.props.mail} />;
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

const mapStateToProps = function(state) {
  return {
    mails: state.reducer.mails,
    mail: state.reducer.mail,
    alert: state.alertReducer,
  };
}

const mapActionsToProps = function (dispatch) {
  return bindActionCreators({
    loadMails, loadMail
  }, dispatch)
}

const InboxWrapper = connect(mapStateToProps, mapActionsToProps)(connectAlert(Inbox));
const MailWrapper = connect(mapStateToProps, mapActionsToProps)(connectAlert(Mail));

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
            {this.props.children ? this.props.children : <InboxWrapper />}
          </div>
        </main>
      </div>
    );
  }
}

(function(){
  render(
    <Provider store={store}>
      <Router history={browserHistory} >
        <Route path="/" component={App} >
          <Route path="/inbox" component={InboxWrapper} />
          <Route path="/inbox/:id" component={MailWrapper} />
          <Route path="/about" component={About} />
        </Route>
      </Router>
    </Provider>
    , document.getElementById('inbox-app')
  );
})();
