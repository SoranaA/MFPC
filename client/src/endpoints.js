const serviceUrl = "https://localhost:5001/api";

const Endpoints = {
  GetUsers: `${serviceUrl}/users`,
  AddUser: `${serviceUrl}/users`,

  GetJobTitles: `${serviceUrl}/jobtitles`,
  AddJobTitle: `${serviceUrl}/jobtitles`,

  GetRoles: `${serviceUrl}/roles`,
};

export { Endpoints };
