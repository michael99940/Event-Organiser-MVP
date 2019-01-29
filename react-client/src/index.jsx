import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import EventItem from './components/EventItem.jsx';
import date from 'date-and-time';
import styles from './components/styles.css.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      events: [],
      charname: '',
      contactmethod: '',
      contactdetails: '',
      year:'',
      month: '',
      day: '',
      hours: '',
      minutes: '',
      duration: '',
      description: ''
    };
    this.update = this.update.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.change = this.change.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  createEvent() {
    console.log(date.isValid(`${this.state.day}-${this.state.month}-${this.state.year}`, 'DD-MM-YYYY'));
    if(!date.isValid(`${this.state.day}-${this.state.month}-${this.state.year} ${this.state.hours}:${this.state.minutes}`, 'DD-MM-YYYY HH:mm')) {
      alert('please enter valid date and time!');
      return;
    }
    for (let key in this.state) {
      if(!this.state[key].length) {
        if(key === 'events' || key === 'error' || key === 'message') {
          continue;
        }
          alert(`${key} entry cannot be left empty!`)
          return;
      }
    }
    $.ajax({
      url: '/event',
      method: 'POST',
      data: { 
        charname: this.state.charname,
        contactmethod: this.state.contactmethod,
        contactdetails: this.state.contactdetails,
        year: this.state.year,
        month: this.state.month,
        day: this.state.day,
        hours: this.state.hours,
        minutes: this.state.minutes,
        duration: this.state.duration,
        timecreated: date.format(new Date(Date.now()), 'YYYY/MM/DD HH:mm:ss'),
        description: this.state.description,
      },      
      success: () => {
        var newEvents = this.state.events.slice(0);
        newEvents.push(this.state);
        this.setState({
          events: newEvents
        })
        this.update();
      },
      error: (err) => {
        console.log('err', err);
      }
    })
  };

  update() {
    $.ajax({
      url: '/events',
      method: 'GET',
      success: (data) => {
        this.setState({
          events: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  };

  delete(id) {
    $.ajax({
      url:'/event',
      method: 'DELETE',
      data: {
        id: id
      },
      success: () => {
        var oldEvents = this.state.events.slice(0);
        this.setState({
          events: this.state.events.splice(id, 1)
        });
        this.update();
      },
      error: (err) => {
        console.log('err', err);
      }
    })
  };

  change(e) {
    let entry = (e.target.id);
    let obj = {};
    obj[entry] = e.target.value.toString();
    this.setState(obj);
  }

  render () {
    return (<div style={styles.fonts}>
      <div style={styles.containerDiv}>
        <div style={styles.absoluteDiv}>
          <div>
          <form style={styles.createFormStyle}>
          <h2 style={styles.createFormHeader}>Create new event</h2>
          <h2 style={this.state.error ? Object.assign({display: 'inline'}, styles.createFormHeader) : Object.assign({display: 'none'}, styles.createFormHeader)}>{this.state.message}</h2>
            <input id='charname' style={styles.createRow1} value={this.state.charName} onChange={e => this.change(e)} placeholder='Character Name'></input>
            <select id='contactmethod' value={this.state.contactMethod} style={styles.createRow2} onChange={e => this.change(e)}>
              <option value=''>Choose Contact Method</option>
              <option value='Discord'>Discord</option>
              <option value='BattleTag'>BattleTag</option>
              <option value='Telephone Number'>Telephone Number</option>
              <option value='Email Address'>Email Address</option>
            </select>
            <input id='contactdetails' value={this.state.contactDetails} style={styles.createRow3} onChange={e => this.change(e)} placeholder='Contact Details'></input>
            <input id='duration' type='number' min='1' max='23' value={this.state.duration}  style={styles.createFormEntry1} onChange={e => this.change(e)} placeholder='Duration/hours'></input>
            <input id='year' style={styles.createFormEntry2} type='number' min='2019' max='2100' value={this.state.year} onChange={e => this.change(e)} placeholder='Year'></input>
            <select id='month' onChange={e => this.change(e)} style={styles.createFormEntry3} value={this.state.month}>
              <option value=''>Month</option>
              <option value='01'>Jan</option>
              <option value='02'>Feb</option>
              <option value='03'>Mar</option>
              <option value='04'>Apr</option>
              <option value='05'>May</option>
              <option value='06'>Jun</option>
              <option value='07'>Jul</option>
              <option value='08'>Aug</option>
              <option value='09'>Sep</option>
              <option value='10'>Oct</option>
              <option value='11'>Nov</option>
              <option value='12'>Dec</option>
            </select>
            <input id='day' style={styles.createFormEntry4} type='number' min='1' max='31' value={this.state.day} onChange={e => this.change(e)} placeholder='Day'></input>
            <input id='hours' style={styles.createFormEntry5} type='number' min='0' max='23' value={this.state.hours} onChange={e => this.change(e)} placeholder='Hours'></input>
            <input id='minutes' style={styles.createFormEntry6} type='number' min='0' max='59' value={this.state.minutes} onChange={e => this.change(e)} placeholder='Minutes'></input>
            <textarea id='description' style={styles.createFormEntryText} rows='10' cols='30' value={this.state.description} onChange={e => this.change(e)} placeholder='Description of the event'></textarea>
            </form>
            <button style={styles.createFormButton} onClick={this.createEvent}>Create New Event</button>
          </div>
        </div>
      </div>
      <button style={styles.updateButton} onClick={this.update}><i className="fa fa-refresh"></i></button>
      <div style={styles.header}>
        <div style={{border: 'solid', borderRadius: '10px', width: '220px', height:'80px'}}>
          <h4> Events </h4>
          There are total of { this.state.events.length } events.
        </div>
        { this.state.events.slice(0).reverse().map(event => <EventItem event={event} delete={this.delete}/>) }
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));