import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Jhan Mocaico - Ingeniero Informático";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGeist(weight: number) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Geist:wght@${weight}&display=swap`,
    { headers: { "User-Agent": "Mozilla/5.0" } }
  ).then((r) => r.text());

  const url = css.match(/src: url\((.+?)\) format/)?.[1];
  if (!url) throw new Error("No se encontró la URL de Geist");
  return fetch(url).then((r) => r.arrayBuffer());
}

export default async function Image() {
  const [geistRegular, geistBold] = await Promise.all([
    loadGeist(400),
    loadGeist(700),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "Geist",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid SVG background */}
        <svg
          style={{ position: "absolute", inset: 0 }}
          width="1200"
          height="630"
        >
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="1200" height="630" fill="url(#grid)" />
        </svg>

        {/* Glow accent */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-200px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Main name */}
        <div
          style={{
            fontSize: "80px",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1,
            letterSpacing: "-3px",
            marginBottom: "16px",
          }}
        >
          JHAN MOCAICO
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: "24px",
            fontWeight: 400,
            color: "#10b981",
            letterSpacing: "6px",
            textTransform: "uppercase",
            marginBottom: "48px",
          }}
        >
          INGENIERO INFORMÁTICO
        </div>

        {/* Divider */}
        <div
          style={{
            width: "80px",
            height: "2px",
            background: "#10b981",
            marginBottom: "40px",
          }}
        />

        {/* Skills */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {["Next.js", "Python", "IoT", "Sistemas Embebidos", "TypeScript"].map(
            (skill) => (
              <div
                key={skill}
                style={{
                  padding: "8px 20px",
                  border: "1px solid rgba(16,185,129,0.3)",
                  color: "#a1a1aa",
                  fontSize: "14px",
                  letterSpacing: "2px",
                  fontWeight: 400,
                }}
              >
                {skill}
              </div>
            )
          )}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "80px",
            color: "#3f3f46",
            fontSize: "16px",
            letterSpacing: "3px",
            fontWeight: 400,
          }}
        >
          mocaico.dev
        </div>

        {/* Logo */}
        <div
          style={{
            position: "absolute",
            top: "48px",
            right: "80px",
            fontSize: "18px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-1px",
            display: "flex",
            alignItems: "center",
          }}
        >
          MOCAICO
          <span style={{ color: "#10b981" }}>.</span>
          DEV
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: geistRegular, weight: 400, style: "normal" },
        { name: "Geist", data: geistBold, weight: 700, style: "normal" },
      ],
    }
  );
}
