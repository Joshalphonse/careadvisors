import React, { Component } from "react";
import Word from "./Word.js";

class WordContainer extends Component {
  render() {
    let wordList = this.props.translations.map(word => {
      return <Word word={word} key={word.id} />;
    });

    return <h1>{wordList} </h1>;
  }
}

export default WordContainer;
