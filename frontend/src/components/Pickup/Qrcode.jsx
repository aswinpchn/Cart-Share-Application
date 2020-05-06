import React, { Component } from "react";
import QRCode from "qrcode.react";

class Qrcode extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const id = this.props.rowIndex;
    const downloadQR = () => {
      const canvas = document.getElementById(id);
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${id}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    return (
      <div>
        <QRCode
          id={id}
          value={id}
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
