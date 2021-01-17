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
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

class Members extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };

    this.fetchUsers = this.fetchUsers.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
    this.editMember = this.editMember.bind(this);
  }

  async componentDidMount() {
    await this.fetchUsers();
  }

  async fetchUsers() {
    fetch(Endpoints.Users)
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

  async deleteMember(id) {
    fetch(Endpoints.Users + `/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        alert("Error while deleting the member");
      } else {
        alert("Member successfully deleted");
        this.fetchUsers();
      }
    });
  }

  async editMember(id) {
    this.props.history.push(`/members/edit?id=${id}`);
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
                  <TableCell></TableCell>
                  <TableCell></TableCell>
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
                      <TableCell>
                        <IconButton
                          onClick={() => {
                            this.editMember(user.id);
                          }}
                          color="primary"
                          aria-label="edit"
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => {
                            this.deleteMember(user.id);
                          }}
                          color="secondary"
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
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
