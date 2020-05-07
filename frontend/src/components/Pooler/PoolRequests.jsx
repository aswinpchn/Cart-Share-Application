import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { properties } from "../../properties";
import ReferrerPoolRequests from "./ReferrerPoolRequests";
import LeaderPoolRequests from "./LeaderPoolRequests";
const backendurl = properties.backendhost;

class PoolRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approverType: "",
      activeSection: "pills-referrer",
    };
  }

  componentDidMount() {
    let userId = localStorage.getItem("userId");
    console.log("the id is" + userId);
    axios
      .post(backendurl + `pool/approverType/` + userId)
      .then((response) => {
        console.log("the approver type is" + response.data);
        this.setState({
          approverType: response.data,
        });
      })
      .catch((error) => {
        console.log("error while getting approverType response" + error);
      });
  }
  onSectionClick = (sectionName) => {
    if (this.state.activeSection !== sectionName) {
      this.setState({
        activeSection: sectionName,
      });
    }
  };

  render() {
    return (
      <div>
        <ul
          className="nav nav-pills nav-justified"
          id="pills-tab"
          role="tablist"
        >
          <li className="nav-item">
            <a
              className={`flex-sm-fill text-sm-center nav-link ${
                this.state.activeSection === "pills-referrer" ? "active" : ""
              }`}
              id="pills-referrer-tab"
              data-toggle="pill"
              href="#pills-referrer"
              role="tab"
              aria-controls="referrer"
              onClick={() => this.onSectionClick("pills-referrer")}
            >
              Requests for Referrer
            </a>
          </li>
          {this.state.approverType === "Leader" ? (
            <li className="nav-item">
              <a
                className={`flex-sm-fill text-sm-center nav-link ${
                  this.state.activeSection === "pills-leader" ? "active" : ""
                }`}
                id="pills-leader-tab"
                data-toggle="pill"
                href="#pills-leader"
                role="tab"
                aria-controls="leader"
                onClick={() => this.onSectionClick("pills-leader")}
              >
                Requests for Leader
              </a>
            </li>
          ) : (
            ""
          )}
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className={`tab-pane fade ${
              this.state.activeSection === "pills-referrer" ? "show active" : ""
            }`}
            id="pills-referrer"
            role="tabpanel"
            aria-labelledby="pills-referrer-tab"
          >
            <ReferrerPoolRequests />
          </div>
          {this.state.approverType === "Leader" ? (
            <div
              className={`tab-pane fade ${
                this.state.activeSection === "pills-leader" ? "show active" : ""
              }`}
              id="pills-leader"
              role="tabpanel"
              aria-labelledby="pills-leader-tab"
            >
              <LeaderPoolRequests />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
export default PoolRequests;
