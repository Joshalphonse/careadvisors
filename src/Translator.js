import React, { Component } from "react";
import axios from "axios";
import "./Translator.css";

class Translator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submittedTexts: "i am not selling knives",
      translations: "",
      output: ""
    };
  }
  componentDidMount() {
    fetch("http://localhost:3000/api/v1/gorbyoyo")
      .then(resp => resp.json())
      .then(wordArray =>
        this.setState({ translations: wordArray[wordArray.length - 1].word })
      );
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);

    axios
      .post(
        "https://72exx40653.execute-api.us-east-1.amazonaws.com/prod/translateEnglishToAlien",
        {
          textToTranslate: this.state.submittedTexts
        }
      )
      .then(response => {
        this.setState({
          translations: response.data
            .map(s => {
              let splitDorb = s.split(/([A-Za-z])/);
              let sum = parseInt(splitDorb[0]) + parseInt(splitDorb[2]);
              return splitDorb[1] + "yo" + sum;
            })
            .join("")
        });

        return axios.post(
          "https://72exx40653.execute-api.us-east-1.amazonaws.com/prod/confirmtranslation",
          {
            textToVerify: this.state.translations
          }
        );
      })
      .then(response => {
        console.log(response, "resp");
        if (response.data === "Success") {
          this.setState({ translations: this.state.translations });
        } else if (response.data === "Invalid translation") {
          this.setState({ translations: "invalid" });
        }
        return axios.post("http://localhost:3000/api/v1/gorbyoyo", {
          word: this.state.translations
        }); // using response.data
      });
  };

  render() {
    console.log(this.state.translations);
    const { submittedTexts } = this.state;

    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <div>
            <h1 class="inputText">ENGLISH TO GORBYOYO:</h1>
            <input
              type="text"
              name="submittedTexts"
              value={submittedTexts.toLowerCase()}
              onChange={this.changeHandler}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
        <p className="gorboyo">
          {this.state.translations !==
          "myo214eyo198qyo222ryo224syo226xyo236wyo234iyo206pyo220pyo220myo214ryo224kyo210oyo218ryo224myo214ayo240iyo206wyo234" ? (
            <p>invalid translation</p>
          ) : (
            <p>{this.state.translations}</p>
          )}
        </p>
      </div>
    );
  }
}

export default Translator;
