import {
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@material-ui/core";
import React, { Component } from "react";
import { Endpoints } from "../../endpoints";

class AddJobTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      roles: [],
      selectedRoles: [],

      nameError: false,
    };

    this.nameChanged = this.nameChanged.bind(this);
    this.descriptionChanged = this.descriptionChanged.bind(this);
    this.cancel = this.cancel.bind(this);
    this.saveJobTitle = this.saveJobTitle.bind(this);
  }

  async componentDidMount() {
    fetch(Endpoints.GetRoles)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ roles: result });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  nameChanged(event) {
    this.setState({
      name: event.target.value,
      nameError: event.target.value.length === 0,
    });
  }

  descriptionChanged(event) {
    this.setState({
      description: event.target.value,
    });
  }

  async saveJobTitle() {
    const { name, description, selectedRoles } = this.state;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        roles: selectedRoles.map((r) => r.id),
      }),
    };

    fetch(Endpoints.AddJobTitle, requestOptions).then((response) => {
      if (!response.ok) {
        alert(`Error while adding a new job title: ${response.statusText}`);
      } else {
        alert("Job Title added successfully!");
        this.props.history.push("/jobtitles");
      }
    });
  }

  cancel() {
    this.props.history.push("/jobtitles");
  }

  render() {
    const { roles, selectedRoles, nameError } = this.state;

    const handleRolesChanged = (role) => () => {
      const { selectedRoles } = this.state;

      const currentIndex = selectedRoles.indexOf(role);

      if (currentIndex === -1) {
        selectedRoles.push(role);
      } else {
        selectedRoles.splice(currentIndex, 1);
      }

      this.setState({ selectedRoles });
    };

    return (
      <div>
        <div className="row">
          <div className="col col-10">
            <h2>Add Job Title</h2>
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
              onClick={this.saveJobTitle}
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
                error={nameError}
                className="formControl"
                id="nameInput"
                label="Name"
                variant="outlined"
                onChange={this.nameChanged}
              />
            </div>
            <div className="col-md-4 mb-3">
              <TextField
                className="description"
                id="descriptionInput"
                label="Description"
                variant="outlined"
                onChange={this.descriptionChanged}
              />
            </div>
          </div>

          <List>
            {roles.map((role) => {
              const labelId = `checkbox-list-label-${role.id}`;
              return (
                <ListItem
                  key={role.id}
                  dense
                  button
                  onClick={handleRolesChanged(role)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selectedRoles.indexOf(role) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={role.name} />
                </ListItem>
              );
            })}
          </List>
        </div>
      </div>
    );
  }
}

export default AddJobTitle;
