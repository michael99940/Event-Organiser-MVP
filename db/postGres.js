const { Pool } = require('pg');
const client = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'gamingevents',
	password: 'admin',
	port: 5432
});

client.connect((err) => {
	if (err) {
		console.error(err.stack);
	} else {
		console.log('connected');
	}
})

const selectEvents = () => {
	return new Promise((resolve, reject) => {
		client.query(`SELECT * FROM events;`, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.rows);
			}
		})
	})
};

const getRegistrations = options => {
	return new Promise((resolve, reject) => {
		client.query(`SELECT * FROM registrations WHERE eventid=${options.id};`, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.rows);
			}
		})
	})
}

const postEvent = options => {
	return new Promise((resolve, reject) => {
		client.query(`INSERT INTO events (charname, contactmethod, contactdetails, year, month, day, hours, minutes, duration, timecreated, description) VALUES (
			'${options.charname}','${options.contactmethod}','${options.contactdetails}','${options.year}','${options.month}',
			'${options.day}','${options.hours}', '${options.minutes}','${options.duration}','${options.timecreated}','${options.description}');`, (err, res) => {
				if (err) {
					reject(err.stack);
					console.log(err.stack);
				} else {
					resolve(res);
				}
			})
	})
};

const signUp = options => {
	return new Promise ((resolve, reject) => {
		console.log(options);
		client.query(`INSERT INTO registrations (eventid, charname, contactmethod, contactdetails, info) VALUES (
			${options.id},'${options.charname}','${options.contactmethod}','${options.contactdetails}','${options.info}');`, (err, res) => {
				if (err) {
					reject(err.stack);
					console.log(err.stack);
				} else {
					resolve(res);
				}
		})
	})
};

const signOff = options => {
	return new Promise((resolve, reject) => {
		client.query(`DELETE FROM registrations WHERE id=${options.id};`, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		})
	})
};

const deleteEvent = options => {
	return new Promise((resolve, reject) => {
		client.query(`DELETE FROM registrations WHERE eventid=${options.id};`, (err, res) => {
			if (err) {
				reject(err);
			} else {
				client.query(`DELETE FROM events WHERE id=${options.id};`, (err, res) => {
					if (err) {
						reject(err);
					} else {
						resolve(res);
					}
				})
			}
		})
	})
}

module.exports = {
	selectEvents,
	postEvent,
	signUp,
	signOff,
	deleteEvent,
	getRegistrations
}