import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./components/Home";
import Members from "./components/Members";
import JobTitle from "./components/JobTitles";

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>My organisation</h1>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/members">Members</NavLink></li>
            <li><NavLink to="/jobtitles">Job Titles</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/members" component={Members}/>
            <Route path="/jobtitles" component={JobTitle}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}
 
export default Main;