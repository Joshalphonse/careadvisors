import React, { Component } from 'react'
import axios from 'axios'
import './Translator.css'
class Translator extends Component {
	constructor(props) {
		super(props)

		this.state = {
      submittedTexts:'',
	  translations:[],
	  output:''
	  
		}
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
		e.preventDefault()
		console.log(this.state)
		axios
      .post('https://72exx40653.execute-api.us-east-1.amazonaws.com/prod/translateEnglishToAlien', {
        textToTranslate: this.state.submittedTexts
  })
			.then(response => {
        this.setState({translations: response.data})
        
        console.log(response.data)
        
			})
			.catch(error => {
				console.log(error)
      })
      
	}


	verify = e => {
		e.preventDefault()
		console.log(this.state)
		axios
      .post('https://72exx40653.execute-api.us-east-1.amazonaws.com/prod/confirmtranslation', {
        textToTranslate: this.state.submittedTexts
  })
			.then(response => {
        this.setState({translations: response.data})
        
        console.log(response.data)
        
			})
			.catch(error => {
				console.log(error)
      })
      
	}

	processText= inputText => {

	}

	render() {
    const { submittedTexts } = this.state
    
		return (
			<div>
				<form onSubmit={this.submitHandler}>
					<div>
						<input
							type="text"
							name="submittedTexts"
							value={submittedTexts.toLowerCase()}
							onChange={this.changeHandler}
												/>
					</div>
					
					<button type="submit">Submit</button>
				</form>
        
        <p>
        { this.state.translations.map(s => {
    let splitDorb = s.split(/([A-Za-z])/)
    let sum = parseInt(splitDorb[0]) + parseInt(splitDorb[2])
    return splitDorb[1] + 'yo' + sum
  }).join('')
  
}
      </p>
      
 
        
			</div>
		)
	}
}

export default Translator



