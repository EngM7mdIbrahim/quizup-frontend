import React from "react";
import "./styles.css";
import WaitingFor from "../WaitingFor";

import QRCode from "react-qr-code";
import AppLabel, { TYPES } from "../../atoms/AppLabel";

export default function QRCodeDetails({
  style = {},
  value = "",
  pin = "No pin passed here - QRCodeDetails",
  className = "",
}) {
  return value === "" ? (
    <WaitingFor text="Waiting For QR Code to be generated ..." />
  ) : (
    <div style={{ ...style }} className={`qrcode-cont ${className}`}>
      <QRCode size={512} value={value} />
      <AppLabel style={{ textAlign: "center" }} type={TYPES.SUB_TITLE}>
        <span style={{ fontWeight: "bold" }}>Game PIN:</span> {pin}
      </AppLabel>
    </div>
  );
}
