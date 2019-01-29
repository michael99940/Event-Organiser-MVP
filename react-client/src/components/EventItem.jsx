import React from 'react';
import date from 'date-and-time';
import $ from 'jquery';
import EventItemForm from './EventItemForm.jsx';
import styles from './styles.css.js';

class EventItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: props.event.id,
      charname: props.event.charname,
      contactmethod: props.event.contactmethod,
      contactdetails: props.event.contactdetails,
      day: props.event.day,
      month: props.event.month,
      year: props.event.year,
      hours: props.event.hours,
      minutes: props.event.minutes,
      description: props.event.description,
      participants: [],
      showParticipants: false,
    }
    this.submitEntry = this.submitEntry.bind(this);
    this.signOff = this.signOff.bind(this);
    this.updateSigns = this.updateSigns.bind(this);
    this.showParticipants = this.showParticipants.bind(this);
  }

  updateSigns(id) {
    console.log(this.state);
    $.ajax({
      url:'/registrations',
      method: 'GET',
      data: {
        id: this.state.id
      },
      success: (data) => {
        console.log('updated', data);
        this.setState({
          participants: data
        })
      }
    })
  }

  submitEntry(signUp) {
    $.ajax({
      url:'/signup',
      method:'POST',
      data: {
        id:signUp.id,
        charname: signUp.signName,
        contactmethod: signUp.signContactMethod,
        contactdetails: signUp.signContactDetails,
        info: signUp.info
      },
      success: () => {
        this.updateSigns(this.state.id);
      },
      error: (err) => {
        console.log('err', err);
      }
    })
  };

  signOff(id) {
    $.ajax({
      url: '/signoff',
      method: 'DELETE',
      data: {
        id: id
      },
      success: () => {
        this.updateSigns(this.state.id);
      },
      error: (err) => {
        console.log('err', err);
      }
    })
  };

  showParticipants(){
    this.setState({
      showParticipants: !this.state.showParticipants
    });
  }

  componentDidMount() {
    this.updateSigns(this.state.id);
  }

  render() {
    return(
      <div>
        <div style={styles.eventContainer}>
          <p style={styles.event1}><u><b>Host Name:</b></u> <br/>{this.state.charname}</p>
          <p style={styles.event2}><u><b>{this.state.contactmethod + ':' }</b></u><br/>{this.state.contactdetails}</p>
          <p style={styles.event3}><u><b>Date and time of event:</b></u><br/>{`${this.state.day}-${this.state.month}-${this.state.year} ${this.state.hours}:${this.state.minutes}`}</p>
          <p style={styles.event4}><u><b>Event Details:</b></u><br/>{this.state.description}</p>
        </div>
        <div style={styles.eventContainer}>
          <p style={{gridColumn: '1', paddingLeft: '30px'}}>Participants:</p> 
          <button style={styles.formButton2} onClick={this.showParticipants}>{this.state.showParticipants ? 'Hide Participants' : 'Show Participants'}
          </button>
          <div style={this.state.showParticipants ? {display: 'block'} : {display: 'none'}}>
          {this.state.participants.map(item => 
            <p>
            <br></br>Character Name: {item.charname}
            <br></br>{item.contactmethod}: {item.contactdetails}
            <br></br>Extra information: {item.info}
              <button onClick={() => this.signOff(item.id)}>cancel</button>
            </p>
          )}
          </div>
        </div>
        <button style={styles.formButton1} onClick={() => this.props.delete(this.state.id)}>Delete Event</button>
        <EventItemForm submitEntry={this.submitEntry} id={this.state.id}/>
      </div>
    )
  }
}

export default EventItem;