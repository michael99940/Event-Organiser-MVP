import React from 'react';
import date from 'date-and-time';
import $ from 'jquery';
import styles from './styles.css.js'

class EventItemForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.id,
			signName: '',
			signContactMethod: '',
			signContactDetails: '',
			info: '',
			formstate: false,
			message: '',
			messageState: false,
		};
		this.change = this.change.bind(this);
		this.showForm = this.showForm.bind(this);
		this.signUp = this.signUp.bind(this);
	}
	change(e) {
		let entry = (e.target.id);
    let obj = {};
    obj[entry] = e.target.value.toString()
    this.setState(obj);
	}

	showForm() {
		this.setState({
			formstate: !this.state.formstate
		});
	}

	signUp() {
		for (let key in this.state) {
      if(!this.state[key].length) {
        if(key === 'formstate' || key === 'message' || key === 'messageState' || key === 'id') {
          continue;
        }
        this.setState({
        	message: `${key} entry cannot be left empty!`,
        	messageState: true,
       	});
       	return;
      }
    }
    this.props.submitEntry(this.state);
	}


	render () {
		return (
			<div style={styles.fonts}>
			<p style={this.state.messageState ? {display: 'block'}: {display: 'none'}}><em>{this.state.message}</em></p>
			<div style={this.state.formstate ? {display: 'block'} : {display: 'none'}}>
			<form style={styles.eventFormStyle}>
          <input id='signName' value={this.state.signName} style={styles.formEntry1} onChange={e => this.change(e)} placeholder='Character Name'></input>
          <select id='signContactMethod' value={this.state.signContactMethod} placeholder='Contact Method' style={styles.formEntry2} onChange={e => this.change(e)}>
            <option value=''>Choose Contact Method</option>
            <option value='Discord'>Discord</option>
            <option value='BattleTag'>Battle Tag</option>
            <option value='Telephone Number'>Telephone Number</option>
            <option value='Email Address'>Email Address</option>
          </select>
          <input id='signContactDetails' value={this.state.signContactDetails} style={styles.formEntry3} placeholder='Contact Details' onChange={e => this.change(e)}></input>
          <textarea style={styles.formEntry4} id='info' placeholder='Extra Information' value={this.state.info} onChange={e => this.change(e)}></textarea>
    		</form>
    		<br></br>
    		  <button style={styles.formButton1} onClick={() => this.signUp()}>Click to Submit</button>
    		  <button style={styles.formButton1} onClick={() => this.showForm()}>Nevermind</button>
    		</div>
    	<button style={this.state.formstate ? Object.assign({display: 'none'}, styles.formButton1) : Object.assign({display: 'block'}, styles.formButton1)} onClick={() => this.showForm()}>Sign Up</button>
			</div>
		)
	}
}

export default EventItemForm;