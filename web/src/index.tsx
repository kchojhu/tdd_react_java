import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import UserSignupPage, {UserSignupAction} from "./pages/UserSignupPage";
import * as apiCalls from './api/apiCalls';

const actions:UserSignupAction = {
    postSignup: apiCalls.signup
}

ReactDOM.render(
  <React.StrictMode>
    <UserSignupPage actions={actions}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
