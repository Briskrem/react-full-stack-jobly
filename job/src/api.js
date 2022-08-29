import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    //if its a post request, data would be sent , if its "get" then params(is from url)
    const params = (method === "get")
        ? data
        : {};
    // console.log(url, method, data, params, 'params')
    // why .data??????????????????????????????????????????????????????????????????
    console.log(params, params.name, '%%%%%%%%%%%%%%%%%%%%%%')
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
    console.log('inside api request')
    //it has this because it is a class method.
    let res = await this.request(`companies/watson-davis`);
    console.log(res)
    // let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // obviously, you'll add a lot here ...

  static async getJobies(endpoint, company_handle){
    const url = `${BASE_URL}/${endpoint}/${company_handle}`
    console.log(url)

    let res = await axios({url})
    console.log(res)
  }
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = ''


// JoblyApi  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImIiLCJ
//pc0FkbWluIjpmYWxzZSwiaWF0IjoxNjYxNjk3Mjk4fQ.Fd1FccRQE6-jWqnkuRSXOzV0Rsu90dwbIpP8cnvREkM"

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImIiLCJpc0FkbWluIjpmYWxzZSwiaWF0I
//joxNjYxNjk3Mjk4fQ.Fd1FccRQE6-jWqnkuRSXOzV0Rsu90dwbIpP8cnvREkM"

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImEiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjYxNjk4MDQ5fQ.El_zxpQxow4TBzVQ5OiqGFS26kRDDpQcJyH12mXdPyc"

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImIiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjYxNjk4MDc5fQ.2lv9PsmR5Eidq3y1DTBA8BfJfiVSOo1d9AGgyetJUgs"

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImEiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjYxNjk4MTMwfQ.mh_fazfOoQoxA1-35lvJ8o0vSUdLX9N_81tAV_pQvyQ"
