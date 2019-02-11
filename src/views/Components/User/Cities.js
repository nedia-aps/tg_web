import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import * as contentAction from "../../../redux/actions";

const Cities = createClass({
	displayName: 'GithubUsers',
	propTypes: {
		label: PropTypes.string,
	},
	//var options:this.props.cities;
	getInitialState () {
		return {
			backspaceRemoves: true,
			multi: true,
			options:this.props.cities
			//options: this.props.countriesList
		};
	},
	onChange (value) {
		this.setState({
			value: value,
		});
	},
	switchToMulti () {
		this.setState({
			multi: true,
			value: [this.state.value],
		});
	},
	switchToSingle () {
		this.setState({
			multi: false,
			value: this.state.value ? this.state.value[0] : null
		});
	},
	getUsers (input) {
		
		this.props.contentAction.getCities({input:input,countryId:this.props.countryId});
		//debugger;
		//return { options: this.props.countriesList };
		return Promise.resolve({ options: this.props.citiesList });
	},
	gotoUser (value, event) {
		window.open(value.html_url);
	},
	toggleBackspaceRemoves () {
		this.setState({
			backspaceRemoves: !this.state.backspaceRemoves
		});
	},
	toggleCreatable () {
		this.setState({
			creatable: !this.state.creatable
		});
	},
	render () {
		const AsyncComponent = this.state.creatable
			? Select.AsyncCreatable
			: Select.Async;

		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<AsyncComponent multi={!this.state.multi} value={this.state.value} onChange={this.onChange} onValueClick={this.gotoUser} valueKey="Id" labelKey="Name" loadOptions={this.getUsers} backspaceRemoves={this.state.backspaceRemoves} />
			</div>
		);
	}
});

const mapStateToProps = ({ contentReducerObject }) => {
  const {
		countriesList,
		citiesList,
		countryId,
	  stateId,
	  cityId
    
  } = contentReducerObject;
  return {
		countriesList,
		citiesList,
		countryId,
	  stateId,
	   cityId
    
  };
};
const mapDispatchToProps = dispatch => {
  return {
    contentAction: bindActionCreators(contentAction, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(Cities)
);

