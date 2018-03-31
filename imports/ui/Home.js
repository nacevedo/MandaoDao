import React, { Component } from "react";
import PropTypes from "prop-types";
import Autosuggest from 'react-autosuggest';
import {Route, NavLink, HashRouter} from "react-router-dom";


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
	name: 'Villavicencio',
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

	onChangeCity(){
		this.props.updateCity(this.state.value);
	}

	render() {


		const { value, suggestions } = this.state;
		const inputProps = {
			placeholder: "Type your city",
			value,
			onChange: this.onChange
		};

		return (
			<div id="home-city">
				<div id="box">
					<h2>Please select the city you are in</h2>
					<div id="chooser">
					<h4>You can then begin to ask the questions you need</h4>
					
					<Autosuggest 
						suggestions={suggestions}
						onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
						onSuggestionsClearRequested={this.onSuggestionsClearRequested}
						getSuggestionValue={getSuggestionValue}
						renderSuggestion={renderSuggestion}
						inputProps={inputProps} />
						
						<NavLink to="/city"><button onClick={this.onChangeCity.bind(this)} className="my-btn">GO</button></NavLink>
					</div>
				</div>
				<p>You&#39;re new to a city? Come talk to people who know the city and easily get around!</p>
				<p>We want to create a community of people that can help each other with what they have to offer. 
				So don't doubt to find help here and to meet new people.</p>
			</div>
			);
	}
}


export default Home;