import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { properties } from "../../properties";
const backendurl = properties.backendhost;

class ReviewPoolRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      referrerScreenName: "",
      requesterScreenName: "",
      poolName: "",
      poolId: "",
      poolRequests: [],
      status: "",
      rowIndex: "",
    };
  }

  componentDidMount() {
    let referrerScreenName = localStorage.getItem("screenName");
    axios
      .get(backendurl + `pool/joinrequest/${referrerScreenName}`)
      .then((response) => {
        console.log("the pool request data is" + response.data);
        this.setState({
          poolRequests: response.data,
        });
      })
      .catch((error) => {
        console.log("error while getting response");
      });
  }

  onApprove(index, poolRequestId) {
    this.setState({
      rowIndex: index,
    });
    axios
      .post(backendurl + `pool/referral/approvejoinrequest/${poolRequestId}`)
      .then((response) => {
        console.log("the approval data is" + response.data);
        this.setState({
          status: response.data,
        });
      })
      .catch((error) => {
        console.log("error while getting response");
        this.setState({
          status: "Approval Failed, " + error,
        });
      });
  }

  render() {
    const { poolRequests, rowIndex, status } = this.state;
    console.log("the current status is" + status);
    console.log("pool request data is" + JSON.stringify(poolRequests));
    console.log("the row index is" + rowIndex);
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align background ">
            <h2 className="text-center text-black font-italic font-family-sans-serif">
              Review Pool Requests
            </h2>
          </div>
        </div>
        <div>
          <table class="table table-bordered table-hover">
            <thead class="thead-dark">
              <tr>
                <th className="text-center" scope="col">
                  Pooler Screen Name
                </th>
                <th className="text-center" scope="col">
                  Pool ID
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
              {poolRequests.map((poolRequest, index) => {
                console.log("the pool req rec is " + poolRequest);
                return (
                  <tr key={index}>
                    <th className="text-center" scope="row">
                      {poolRequest.userScreenName}
                    </th>
                    <td className="text-center">{poolRequest.id}</td>
                    <td className="text-center">{poolRequest.poolName}</td>
                    <td className="text-center">
                      <tr className="text-center">
                        <td>
                          <Button
                            className="btn btn-success"
                            onClick={() =>
                              this.onApprove(index, poolRequest.id)
                            }
                            type="submit"
                          >
                            Approve
                          </Button>
                          {rowIndex === index ? (
                            <div>
                              <p className="text-danger">{status}</p>
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </td>

                        <td>
                          <Button
                            className="btn btn-danger"
                            onClick={this.handleSubmit}
                            type="submit"
                          >
                            Reject
                          </Button>
                        </td>
                      </tr>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default ReviewPoolRequests;
