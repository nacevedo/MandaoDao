import React, { Component } from "react";
import PropTypes from "prop-types";
import Autosuggest from 'react-autosuggest';


const cities = [
{
	name: 'Bogotá',
},
{
	name: 'Pereira',
},
{
	name: 'Cali',
},
{
	name: 'Puerto Carreño',
},
{
	name: 'Vilavicencio',
},
{
	name: 'Medellín',
},
{
	name: 'Pasto',
},
{
	name: 'Bucaramanga',
}
];

function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
	const escapedValue = escapeRegexCharacters(value.trim());

	if (escapedValue === '') {
		return [];
	}

	const regex = new RegExp('^' + escapedValue, 'i');

	return cities.filter(cities => regex.test(cities.name));
}

function getSuggestionValue(suggestion) {
	return suggestion.name;
}

function renderSuggestion(suggestion) {
	return (
		<span>{suggestion.name}</span>
		);
}


class Home extends Component {


	constructor() {
		super();

		this.state = {
			value: '',
			suggestions: []
		};    
	}

	onChange = (event, { newValue, method }) => {
		this.setState({
			value: newValue
		});
	};

	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({
			suggestions: getSuggestions(value)
		});
	};

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};



	render() {


		const { value, suggestions } = this.state;
		const inputProps = {
			placeholder: "Type your city",
			value,
			onChange: this.onChange
		};

		return (
			<div id="home-city">
				<h2>Please select the city you are in</h2>
				<p>You can then begin to ask the questions you need</p>
			
				
				<Autosuggest 
				
					suggestions={suggestions}
					onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
					onSuggestionsClearRequested={this.onSuggestionsClearRequested}
					getSuggestionValue={getSuggestionValue}
					renderSuggestion={renderSuggestion}
					inputProps={inputProps} />
					
					
					<button onClick={} >GO</button>
		

				<p>{this.state.value}</p>
			</div>
			);
	}
}


export default Home;