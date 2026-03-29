import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate, spring } from "remotion";

export const MyVideo = ({ script }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Smooth pop-in animation
  const scale = spring({
    fps,
    frame,
    config: { damping: 12, stiffness: 100 }
  });

  // Fade in over first 15 frames
  const opacity = interpolate(
    frame,
    [0, 15],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ 
      backgroundColor: "#111111", 
      color: "#ffffff",
      justifyContent: "center",
      alignItems: "center",
      padding: "80px",
      textAlign: "center"
    }}>
      <div style={{ 
        transform: `scale(${scale})`, 
        opacity,
        fontSize: "64px",
        fontWeight: "bold",
        fontFamily: "system-ui, sans-serif",
        lineHeight: 1.5,
        textShadow: "0 4px 10px rgba(0,0,0,0.5)"
      }}>
        {script || "AI Generated Hook Appears Here 🚀"}
      </div>
    </AbsoluteFill>
  );
};
