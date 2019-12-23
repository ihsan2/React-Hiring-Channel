import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import component
import Welcome from "../Welcome/Welcome";
import RegisterEngineer from "../Welcome/RegisterEngineer";
import LoginEngineer from "../Welcome/LoginEngineer";
import RegisterCompany from "../Welcome/RegisterCompany";
import LoginCompany from "../Welcome/LoginCompany";
import Main from "../Engineer/Main";
import ProfileCompany from "../Engineer/ProfileCompany";
import Company from "../Engineer/Company";
import EngineerById from "../Engineer/EngineerById";
import MainCompany from "../Company/MainCompany";
import Engineer from "../Company/EngineerById";
import Profile from "../Company/Profile";
import CompanyId from "../Company/Company";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/register-engineer" component={RegisterEngineer} />
        <Route path="/login-engineer" component={LoginEngineer} />
        <Route path="/register-company" component={RegisterCompany} />
        <Route path="/login-company" component={LoginCompany} />

        <Route exact path="/engineer" component={Main} />
        <Route exact path="/company" component={MainCompany} />
        <Route path="/engineer/:id" component={EngineerById} />
        <Route path="/engineer-id/:id" component={Engineer} />
        <Route path="/profile-engineer/:id" component={Profile} />
        <Route path="/profile-company/:id" component={ProfileCompany} />
        <Route path="/company/:id" component={Company} />
        <Route path="/company-id/:id" component={CompanyId} />
      </Switch>
    </Router>
  );
}

export default Routes;
