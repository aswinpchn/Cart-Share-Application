import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";
import {
  getReferrerRequests,
  referrerApproveRequest,
  referrerRejectRequest,
} from "../_actions/poolActions";
import { connect } from "react-redux";
import { properties } from "../../properties";
import Spinner from "../common/Spinner";
import swal from "sweetalert";
const backendurl = properties.backendhost;

class ReferrerPoolRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      referrerScreenName: "",
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
    this.props.getReferrerRequests();
  }

  onApprove(index, poolRequestId) {
    this.setState({
      rowIndex: index,
    });
    this.props.referrerApproveRequest(poolRequestId);
  }

  onReject(index, poolRequestId) {
    this.setState({
      rowIndex: index,
    });
    this.props.referrerRejectRequest(poolRequestId);
  }

  render() {
    const { rowIndex, approvalResponse, rejectionResponse } = this.state;
    const { poolRequests, loading } = this.props.poolState;
    let spinner;
    if (poolRequests === null || loading) {
      spinner = <Spinner />;
    }
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div>
          <table className="table table-bordered table-hover">
            <thead className="thead">
              <tr>
                <th className="text-center font-weight-bold" scope="col">
                  Pooler Screen Name
                </th>
                <th className="text-center font-weight-bold" scope="col">
                  Pool Name
                </th>
                <th className="text-center font-weight-bold" scope="col">
                  Current Status
                </th>
                <th className="text-center font-weight-bold" scope="col">
                  Decision
                </th>
              </tr>
            </thead>
            <tbody>
              {poolRequests
                .filter((poolRequest) => poolRequest.status === "Pending")
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

                            {/* {rowIndex === index ? (
                              <div>
                                <p className="text-primary">
                                  {approvalResponse}
                                </p>
                              </div>
                            ) : (
                              ""
                            )} */}
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

                            {/* {rowIndex === index ? (
                              <div>
                                <p className="text-primary">
                                  {rejectionResponse}
                                </p>
                              </div>
                            ) : (
                              ""
                            )} */}
                          </td>
                        </tr>
                      </td>
                      {spinner}
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

ReferrerPoolRequests.propTypes = {
  errors: PropTypes.object.isRequired,
  poolRequests: PropTypes.array,
};
const mapStateToProps = (state) => ({
  poolState: state.poolState,
  errors: state.errorState,
});
export default connect(mapStateToProps, {
  getReferrerRequests,
  referrerApproveRequest,
  referrerRejectRequest,
})(ReferrerPoolRequests);
