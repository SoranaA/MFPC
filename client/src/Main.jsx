import React, { Component } from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import Home from "./components/Home";
import Members from "./components/members/Members";
import AddMember from "./components/members/AddMember";
import JobTitle from "./components/jobTitles/JobTitles";

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>My organisation</h1>
          <ul className="header">
            <li>
              <NavLink exact to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/members">Members</NavLink>
            </li>
            <li>
              <NavLink to="/jobtitles">Job Titles</NavLink>
            </li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home} />
            <Route exact path="/members" component={Members} />
            <Route exact path="/members/new" component={AddMember} />
            <Route exact path="/jobtitles" component={JobTitle} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;
