import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { properties } from "../../properties";
const backendurl = properties.backendhost;

class LeaderPoolRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderScreenName: "",
      requesterScreenName: "",
      poolName: "",
      poolId: "",
      poolRequests: [],
      approvalResponse: "",
      rejectionResponse: "",
      rowIndex: "",
    };
  }

  componentDidMount() {
    let leaderScreenName = localStorage.getItem("screenName");
    axios
      .get(backendurl + `pool/leader/joinrequest/${leaderScreenName}`)
      .then((response) => {
        console.log("the pool request data is" + response.data);
        this.setState({
          poolRequests: response.data,
        });
      })
      .catch((error) => {
        console.log("error while getting response" + error);
      });
  }

  onApprove(index, poolRequestId) {
    this.setState({
      rowIndex: index,
    });
    axios
      .post(backendurl + `pool/leader/approvejoinrequest/${poolRequestId}`)
      .then((response) => {
        console.log("the approval data is" + response.data);
        this.setState({
          approvalResponse: response.data,
        });
      })
      .catch((error) => {
        console.log("error while getting response");
        this.setState({
          approvalResponse: "Approval Failed, " + error,
        });
      });
  }

  onReject(index, poolRequestId) {
    this.setState({
      rowIndex: index,
    });
    axios
      .post(backendurl + `pool/rejectjoinrequest/${poolRequestId}`)
      .then((response) => {
        console.log("the rejection data is" + response.data);
        this.setState({
          rejectionResponse: response.data,
        });
      })
      .catch((error) => {
        console.log("error while getting response");
        this.setState({
          rejectionResponse: "Rejection Failed, " + error,
        });
      });
  }

  render() {
    const {
      poolRequests,
      rowIndex,
      approvalResponse,
      rejectionResponse,
    } = this.state;
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div>
          <table className="table table-bordered table-hover">
            <thead className="thead">
              <tr>
                <th className="text-center  font-weight-bold" scope="col">
                  Pooler Screen Name
                </th>
                <th className="text-center  font-weight-bold" scope="col">
                  Pool Name
                </th>
                <th className="text-center  font-weight-bold" scope="col">
                  Current Status
                </th>
                <th className="text-center  font-weight-bold" scope="col">
                  Decision
                </th>
              </tr>
            </thead>
            <tbody>
              {poolRequests
                .filter(
                  (poolRequest) =>
                    poolRequest.status === "Pending_Leader_Approval"
                )
                .map((poolRequest, index) => {
                  console.log("the pool req rec is " + poolRequest);
                  return (
                    <tr key={index}>
                      <th className="text-center" scope="row">
                        {poolRequest.userScreenName}
                      </th>
                      <td className="text-center">{poolRequest.poolName}</td>
                      <td className="text-center">{poolRequest.status}</td>
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
                                <p className="text-primary">
                                  {approvalResponse}
                                </p>
                              </div>
                            ) : (
                              ""
                            )}
                          </td>

                          <td>
                            <Button
                              className="btn btn-danger"
                              onClick={() => {
                                this.onReject(index, poolRequest.id);
                              }}
                              type="submit"
                            >
                              Reject
                            </Button>
                            {rowIndex === index ? (
                              <div>
                                <p className="text-primary">
                                  {rejectionResponse}
                                </p>
                              </div>
                            ) : (
                              ""
                            )}
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
export default LeaderPoolRequests;
