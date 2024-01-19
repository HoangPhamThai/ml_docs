import React from "react";

export function Text({ content, color, weight = "bold", style = "italic" }) {
  return (
    <span
      style={{
        color: color,
        fontWeight: weight,
        fontStyle: style,
      }}
    >
      {content}
    </span>
  );
}

export function EmphasisText({
  content,
  color = "red",
  weight = "bold",
  style = "italic",
}) {
  return (
    <span
      style={{
        color: color,
        fontWeight: weight,
        fontStyle: style,
      }}
    >
      {content}
    </span>
  );
}
