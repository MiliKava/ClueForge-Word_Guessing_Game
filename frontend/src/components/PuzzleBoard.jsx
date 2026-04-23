import React from "react";
import "./PuzzleBoard.css";

export default function PuzzleBoard({ masked }) {
  // masked string might be "S _ P E _   P _ W _ R"
  // Words are separated by double space or a specific character in typical masking?
  // Our backend uses " " for space and "_" for un-guessed.
  // We should split by space to get words, then by letters.

  const words = masked.split("   ").length > 1 ? masked.split("   ") : masked.split("  ").length > 1 ? masked.split("  ") : masked.split(" ");

  // If the string doesn't have spaces between characters (like when we reveal the full phrase),
  // we should convert it to the expected spaced format.
  const processedMasked = masked.includes(" ") ? masked : masked.split("").join(" ");
  const tokens = processedMasked.split(" ");

  return (
    <div className="puzzle-board">
      {tokens.map((token, index) => {
        if (token === "") {
          return <div key={`gap-${index}`} className="puzzle-gap"></div>;
        }

        return (
          <div key={`tile-${index}`} className={`puzzle-tile ${token !== "_" ? "filled" : ""}`}>
            {token !== "_" ? token : ""}
          </div>
        );
      })}
    </div>
  );
}