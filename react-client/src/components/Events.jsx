import React from 'react';
import EventItem from './EventItem.jsx';
import styles from './styles.css.js'

const Events = (props) => (
  <div style={styles.header}>
  	<div style={{border: 'solid', borderRadius: '10px', width: '220px', height:'80px'}}>
    	<h4> Events </h4>
    	There are total of { props.events.length } events.
    </div>
    { props.events.slice(0).reverse().map(event => <EventItem event={event} delete={props.delete}/>) }
  </div>
)

export default Events;