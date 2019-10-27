import React from "react";

const Word = props => {
  let { word } = props;

  return <div>{word.name}</div>;
};
export default Word;
