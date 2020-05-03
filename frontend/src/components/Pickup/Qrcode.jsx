import React, { Component } from "react";
import { Container, Button, Col, Row, Card } from "react-bootstrap";
import QRCode from "qrcode.react";

class Qrcode extends Component {
  render() {
    const downloadQR = () => {
      const canvas = document.getElementById("12345678");
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "12345678.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    return (
      <div>
        <QRCode
          id="12345678"
          value="12345678"
          size={290}
          level={"H"}
          includeMargin={true}
        />
        <a onClick={downloadQR}> Download QR </a>
      </div>
    );
  }
}

export default Qrcode;
