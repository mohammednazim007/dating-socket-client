"use client";
import { useEffect, useState } from "react";

const TextAnimation = ({
  text,
  delay = 400,
}: {
  text: string;
  delay?: number;
}) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    const words = text.split(" ");
    let index = 0;

    function showNextWord() {
      if (index < words.length) {
        setDisplayed((prev) =>
          prev ? prev + " " + words[index] : words[index]
        );
        index++;
        setTimeout(showNextWord, delay);
      }
    }

    showNextWord();
  }, [text, delay]);

  return <p style={{ whiteSpace: "pre-wrap" }}>{displayed}</p>;
};
export default TextAnimation;
