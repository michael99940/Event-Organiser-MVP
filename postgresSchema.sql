DROP DATABASE IF EXISTS gamingevents;

CREATE DATABASE gamingevents;

\c gamingevents;

CREATE TABLE IF NOT EXISTS events (
  id SERIAL UNIQUE PRIMARY KEY,
  charname text NOT NULL,
  contactmethod text NOT NULL,
  contactdetails text NOT NULL,
  year varchar(4) NOT NULL,
  month varchar(3) NOT NULL,
  day varchar(2) NOT NULL,
  hours varchar(2) NOT NULL,
  minutes varchar(2) NOT NULL,
  duration varchar(2) NOT NULL,
  timecreated text NOT NULL,
  description text NOT NULL
);

CREATE TABLE IF NOT EXISTS registrations (
  id SERIAL UNIQUE PRIMARY KEY,
  eventid INTEGER REFERENCES events(id),
  charname text NOT NULL,
  contactmethod text NOT NULL,
  contactdetails text NOT NULL,
  info text NOT NULL
);

COPY events(id, charname, contactmethod, contactdetails, year, month, day, hours, minutes, duration, timecreated, description) FROM 'C:/Users/michael Lau/hrsf107-mvp-starter/Events.csv' (FORMAT CSV);

COPY registrations(eventid, charname, contactmethod, contactdetails, info) FROM 'C:/Users/michael Lau/hrsf107-mvp-starter/Signs.csv' (FORMAT CSV);

CREATE INDEX foreign_id ON registrations (eventid);

SELECT setval('events_id_seq', (SELECT MAX(id) FROM events)+1);

SELECT setval('registrations_id_seq', (SELECT MAX(id) FROM registrations)+1);
