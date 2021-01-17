import React, { Component } from "react";
import { Endpoints } from "../endpoints";

class Members extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  async componentDidMount() {
    fetch(Endpoints.GetUsers)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ users: result });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <h2>Members</h2>
        {users.length == 0 ? (
          <p>No users added yet</p>
        ) : (
          <ol>
            {users.map((user) => (
              <li>{user.username}</li>
            ))}
          </ol>
        )}
      </div>
    );
  }
}

export default Members;
