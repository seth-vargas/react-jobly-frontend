import axios from "axios";

const BASE_URL = "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

export default class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /* Get list of companies */

  static async getCompanies(searchTerm) {
    let res;

    if (searchTerm) {
      res = await this.request(`companies?name=${searchTerm}`);
    } else {
      res = await this.request("companies");
    }

    return res.companies;
  }

  /** Get details on a job by ID */

  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  /** Get list of jobs */

  static async getJobs(searchTerm) {
    let res;

    if (searchTerm) {
      res = await this.request(`jobs?title=${searchTerm}`);
    } else {
      res = await this.request("jobs");
    }

    return res.jobs;
  }

  /** Apply to a job */

  static async applyToJob(username, id) {
    await this.request(`users/${username}/jobs/${id}`, {}, "post");
  }

  /** Create new user in db */

  static async registerUser(formData) {
    let res = await this.request("auth/register", formData, "post");
    return res;
  }

  /** Get the current user. */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Log a user in */

  static async loginUser(formData) {
    let res = await this.request("auth/token", formData, "post");
    console.log(res);

    return res;
  }

  static async editUser(formData, username) {
    let res = await this.request(`users/${username}`, formData, "patch");
    return res.user;
  }
}
