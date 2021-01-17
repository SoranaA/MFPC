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

class JobTitles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobTitles: [],
    };

    this.fetchJobTitles = this.fetchJobTitles.bind(this);
    this.getRolesNamesAsString = this.getRolesNamesAsString.bind(this);
    this.editJobTitle = this.editJobTitle.bind(this);
    this.deleteJobTitle = this.deleteJobTitle.bind(this);
  }

  getRolesNamesAsString(roles) {
    let roleNames = "";

    roles.forEach((role) => {
      roleNames += role.name + ", ";
    });

    return roleNames.slice(0, -2);
  }

  async componentDidMount() {
    await this.fetchJobTitles();
  }

  async fetchJobTitles() {
    fetch(Endpoints.JobTitles)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ jobTitles: result });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  async deleteJobTitle(id) {
    fetch(Endpoints.JobTitles + `/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        alert("Error while deleting the job title");
      } else {
        alert("Job title successfully deleted");
        this.fetchJobTitles();
      }
    });
  }

  async editJobTitle(id) {
    console.log(id);
  }

  render() {
    const { jobTitles } = this.state;

    return (
      <div>
        <div className="row">
          <div className="col col-10">
            <h2>Job Titles</h2>
          </div>
          <div className="col col-2">
            <NavLink className="float-right" to="/jobtitles/new">
              <Button variant="outlined">Add</Button>
            </NavLink>
          </div>
        </div>
        {jobTitles.length === 0 ? (
          <p>No job titles added yet</p>
        ) : (
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Roles</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {jobTitles.map((jobTitle, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {jobTitle.id}
                      </TableCell>
                      <TableCell>{jobTitle.name}</TableCell>
                      <TableCell>{jobTitle.description}</TableCell>
                      <TableCell>
                        {jobTitle.roles.length !== 0
                          ? this.getRolesNamesAsString(jobTitle.roles)
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => {
                            this.editJobTitle(jobTitle.id);
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
                            this.deleteJobTitle(jobTitle.id);
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

export default JobTitles;
