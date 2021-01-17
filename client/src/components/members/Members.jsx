import React, { Component } from "react";
import { Endpoints } from "../../endpoints";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";

class Members extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      showAddModal: false,
    };

    this.addNewMember = this.addNewMember.bind(this);
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

  async addNewMember() {
    alert("clicked");
  }

  render() {
    const { users } = this.state;

    return (
      <div>
        <div className="row">
          <div className="col col-10">
            <h2>Members</h2>
          </div>
          <div className="col col-2">
            <NavLink className="float-right" to="/members/new">
              <Button variant="outlined">Add</Button>
            </NavLink>
          </div>
        </div>
        {users.length === 0 ? (
          <p>No users added yet</p>
        ) : (
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Added On</TableCell>
                  <TableCell>Job Title</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users.map((user, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {user.id}
                      </TableCell>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.addedOn}</TableCell>
                      <TableCell>
                        {user.jobTitle !== null ? user.jobTitle.name : "-"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    );
  }
}

export default Members;
