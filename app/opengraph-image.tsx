import { ImageResponse } from "next/og";

export const alt = "Abdulrahman Alnashri · AI Engineer at Zid";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", height: "100%", padding: 80, background: "#0A0F2D", color: "#9CC7E8" }}>
      <div style={{ display: "flex", color: "#00BFFF", fontSize: 24, marginBottom: 32 }}>AI PRODUCTS / AGENTS / ROBOTICS</div>
      <div style={{ display: "flex", color: "white", fontSize: 68, fontWeight: 700, lineHeight: 1.15 }}>Abdulrahman Alnashri</div>
      <div style={{ display: "flex", color: "#00BFFF", fontSize: 36, marginTop: 24 }}>AI Engineer @ Zid</div>
      <div style={{ display: "flex", fontSize: 22, marginTop: 60 }}>abdulrahman-alnashri.vercel.app</div>
    </div>, size
  );
}
