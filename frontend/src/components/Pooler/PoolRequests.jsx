import React, { Component } from "react";
import { Button } from "react-bootstrap";

class ReviewPoolRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenName: "",
      poolName: "",
      poolId: "",
      requesterScreenName: "",
    };
  }

  render() {
    return (
      <div>
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align background ">
              <h2 className="text-center text-black font-italic font-family-sans-serif">
                Review Pool Requests
              </h2>
            </div>
          </div>
          <table class="table table-bordered table-hover">
            <thead class="thead-dark">
              <tr>
                <th className="text-center" scope="col">
                  Pooler Screen Name
                </th>
                <th className="text-center" scope="col">
                  Pool Name
                </th>
                <th className="text-center" scope="col">
                  Decision
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="text-center" scope="row">
                  Mark
                </th>
                <td className="text-center">Centerra</td>
                <td className="text-center" colspan="2">
                  <Button
                    className="btn btn-success"
                    onClick={this.handleSubmit}
                    type="submit"
                  >
                    Approve
                  </Button>

                  <Button
                    className="btn btn-danger"
                    onClick={this.handleSubmit}
                    type="submit"
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ReviewPoolRequests;
