import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { Component } from "react";
import { Endpoints } from "../../endpoints";

class AddMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      jobTitleId: 0,
      jobTitles: [],

      firstNameError: false,
      lastNameError: false,
      emailError: false,
    };

    this.firstNameChanged = this.firstNameChanged.bind(this);
    this.lastNameChanged = this.lastNameChanged.bind(this);
    this.emailChanged = this.emailChanged.bind(this);
    this.handleJobTitleChanged = this.handleJobTitleChanged.bind(this);
    this.cancel = this.cancel.bind(this);
    this.saveMember = this.saveMember.bind(this);
  }

  async componentDidMount() {
    fetch(Endpoints.GetJobTitles)
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

  firstNameChanged(event) {
    this.setState({
      firstName: event.target.value,
      firstNameError: event.target.value.length === 0,
    });
  }

  lastNameChanged(event) {
    this.setState({
      lastName: event.target.value,
      lastNameError: event.target.value.length === 0,
    });
  }

  emailChanged(event) {
    this.setState({
      email: event.target.value,
      emailError: event.target.value.length === 0,
    });
  }

  handleJobTitleChanged(event) {
    this.setState({
      jobTitleId: event.target.value,
    });
  }

  async saveMember() {
    const { firstName, lastName, email, jobTitleId } = this.state;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        jobTitleId: jobTitleId === 0 ? null : jobTitleId,
      }),
    };

    fetch(Endpoints.AddUser, requestOptions)
      .then((response) => response.json())
      .then(
        (result) => {
          if (result.status === 400) {
            alert("You must provide all the required fields");

            this.setState({
              firstNameError: firstName.length === 0,
              lastNameError: lastName.length === 0,
              emailError: email.length === 0,
            });

            return;
          }

          alert("Member added successfully!");
          this.props.history.push("/members");
        },
        (error) => {
          alert(`Error while adding a new member: ${error.message}`);
        }
      );
  }

  cancel() {
    this.props.history.push("/members");
  }

  render() {
    const {
      jobTitleId,
      jobTitles,
      firstNameError,
      lastNameError,
      emailError,
    } = this.state;

    return (
      <div>
        <div className="row">
          <div className="col col-10">
            <h2>Add member</h2>
          </div>
          <div className="col col-2">
            <Button
              className="float-right m-1"
              variant="contained"
              color="secondary"
              onClick={this.cancel}
            >
              Cancel
            </Button>
            <Button
              className="float-right m-1"
              variant="contained"
              color="primary"
              onClick={this.saveMember}
            >
              Save
            </Button>
          </div>
        </div>
        <div>
          <div className="form-group row">
            <div className="col-md-4 mb-3">
              <TextField
                required
                error={firstNameError}
                className="formControl"
                id="firstNameInput"
                label="First Name"
                variant="outlined"
                onChange={this.firstNameChanged}
              />
            </div>
            <div className="col-md-4 mb-3">
              <TextField
                required
                error={lastNameError}
                className="formControl"
                id="lastNameInput"
                label="Last Name"
                variant="outlined"
                onChange={this.lastNameChanged}
              />
            </div>
            <div className="col-md-4 mb-3">
              <TextField
                required
                error={emailError}
                className="formControl"
                id="emailInput"
                label="Email"
                variant="outlined"
                onChange={this.emailChanged}
              />
            </div>
          </div>

          <FormControl variant="outlined" className="formControl">
            <InputLabel id="jobTitleLabel">Job Title</InputLabel>
            <Select
              labelId="jobTitleLabel"
              id="jobTitleInput"
              value={jobTitleId}
              onChange={this.handleJobTitleChanged}
              label="Job Title"
            >
              <MenuItem value={0}>
                <em>None</em>
              </MenuItem>
              {jobTitles.map((jobTitle) => {
                return (
                  <MenuItem key={jobTitle.id} value={jobTitle.id}>
                    {jobTitle.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>
    );
  }
}

export default AddMember;
