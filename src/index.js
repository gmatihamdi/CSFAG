/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route ,BrowserRouter,Redirect} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "Component/component_login/auth";

import App from "../src/layouts/Admin";
  //  <Redirect to="/admin/dashboard" />  <Redirect from="/" to="/auth" /> <Route path="/admin" render={(props) => <AdminLayout {...props} />} /> <Redirect from="/" to="/admin/index" />

  //ReactDOM.render(<App />, document.getElementById('root'));

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  //serviceWorker.unregister();




  ReactDOM.render(
  <BrowserRouter>

    <Switch>
    <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
    <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
    
    <Redirect to="/auth" />
    </Switch>

  </BrowserRouter>,
  document.getElementById("root")
);
