import React, { Component } from "react";
import PropTypes from "prop-types";
import Autosuggest from 'react-autosuggest';
import {Route, NavLink, HashRouter} from "react-router-dom";

import cities from 'cities.json';


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
			suggestions: [],
			lati: 0,
			longi: 0
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

	/*geoFindMe(){

		var options = {
		  enableHighAccuracy: true,
		  timeout: 50000,
		  maximumAge: 0
		};

		function success(pos) {
		  var crd = pos.coords;

		  console.log('Your current position is:');
		  console.log(`Latitude : ${crd.latitude}`);
		  console.log(`Longitude: ${crd.longitude}`);
		  console.log(`More or less ${crd.accuracy} meters.`);
		}

		function error(err) {
		  console.warn(`ERROR(${err.code}): ${err.message}`);
		}

		navigator.geolocation.getCurrentPosition(success, error, options);
	    
	
		  var output = document.getElementById("out");

		  if (!navigator.geolocation){
		    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
		    return;
		  }

		  function success(position) {
		    var latitude  = position.coords.latitude;
		    var longitude = position.coords.longitude;

		    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

		  }

		  function error() {
		    output.innerHTML = "Unable to retrieve your location";
		  }

		  //output.innerHTML = "<p>Locating…</p>";

		  navigator.geolocation.getCurrentPosition(success, error);
		


	} */

	geoFindMe() {
	  var output = document.getElementById("out");

	  if (!navigator.geolocation){
	    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
	    return;
	  }

	  function success(position) {
	    var latitude  = position.coords.latitude;
	    var longitude = position.coords.longitude;

	    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

	  }

	  function error() {
	    output.innerHTML = "Unable to retrieve your location";
	  }

	  document.getElementById("out").innerHTML = "<p>Locating…</p>";

	  navigator.geolocation.getCurrentPosition(success, error);
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
			<div className="row">
				<div className="box3 col-sm-8">
					<h2>Please select the city you are in</h2>
					<div id="chooser">
					<h4>You can then begin to ask the questions you need</h4>
					
					<Autosuggest 
						suggestions={suggestions}
						onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
						onSuggestionsClearRequested={this.onSuggestionsClearRequested}
						getSuggestionValue={getSuggestionValue}
						renderSuggestion={renderSuggestion}
						inputProps={inputProps}
						aria-label="Autosuggest for cities" />
						
						<NavLink to="/city"><button onClick={this.onChangeCity.bind(this)} className="my-btn">GO</button></NavLink>
					</div>
				</div>
				<div className="box6 col-sm-4">
				<h4 id="acc">We can give you recommendations of cities near your location just</h4>
				<button className="my-btn-7" onClick={this.geoFindMe.bind(this)}>Click here!</button>
				<div id="out"></div>
				</div>
				</div>
				<p>You&#39;re new to a city? Come talk to people who know the city and easily get around!</p>
				<p>We want to create a community of people that can help each other with what they have to offer. 
				So don't doubt to find help here and to meet new people.</p>
				<p> </p>
				<p> </p>
				<p> </p>
				<p> </p>
				<p> </p>
				<p> </p>
			</div>
			);
	}
}

/*
if(Meteor.isClient) {

	Meteor.startup(function() {
	    if (Session.get('lat') == undefined 
	             || Session.get('lon') == undefined) {
	        navigator.geolocation.getCurrentPosition(function(position) {
	            Session.set('lat', position.coords.latitude);
	            console.log(Session.get('lat'));
	            console.log(Session.get('lon'));
	            Session.set('lon', position.coords.longitude);
	        });
	    }
	});

}
*/
export default Home;