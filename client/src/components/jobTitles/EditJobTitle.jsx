import { Button, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { Endpoints } from "../../endpoints";

class EditJobTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      name: "",
      description: "",
      nameError: false,
    };

    this.nameChanged = this.nameChanged.bind(this);
    this.descriptionChanged = this.descriptionChanged.bind(this);
    this.cancel = this.cancel.bind(this);
    this.saveJobTitle = this.saveJobTitle.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;

    fetch(Endpoints.JobTitles + `/${id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ name: result.name, description: result.description });
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
    const { name, description } = this.state;
    const { id } = this.props;

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: parseInt(id),
        name,
        description,
      }),
    };

    fetch(Endpoints.JobTitles + `/${id}`, requestOptions).then((response) => {
      if (!response.ok) {
        alert(`Error while editing job title: ${response.statusText}`);
      } else {
        alert("Job Title changed successfully!");
        this.props.history.push("/jobtitles");
      }
    });
  }

  cancel() {
    this.props.history.push("/jobtitles");
  }

  render() {
    const { name, description, nameError } = this.state;

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
                value={name}
              />
            </div>
            <div className="col-md-4 mb-3">
              <TextField
                className="description"
                id="descriptionInput"
                label="Description"
                variant="outlined"
                onChange={this.descriptionChanged}
                value={description}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditJobTitle;
