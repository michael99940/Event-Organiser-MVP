const date = require('date-and-time');
const faker = require('faker');
const path = require('path');
const fs = require('fs');
const contact = ['Discord', 'BattleTag', 'Email', 'Mobile Number'];
const generateName = () => `${faker.commerce.productAdjective()} ${faker.commerce.department()} ${faker.commerce.product()}`;
const generateDates = () => {
	let dateArr = [];
	let fakedate = new Date(faker.date.future());
	console.log(fakedate);
	dateArr.push(date.format(fakedate, 'YYYY').toString());
	dateArr.push(date.format(fakedate, 'MMM').toString());
	dateArr.push(date.format(fakedate, 'DD').toString());
	dateArr.push(date.format(fakedate, 'HH').toString());
	dateArr.push(date.format(fakedate, 'ss').toString());
	return dateArr;
}
const generateEntry = () => faker.lorem.paragraph();
const generateDate = () => date.format(faker.date.past(), 'YYYY/MM/DD HH:mm:ss');


let i = 0;
let sampleSize = 100;
const wEventStream = fs.createWriteStream('./Events.csv', {flags: 'w'});
const wSignStream = fs.createWriteStream('./Signs.csv', {flags: 'w'});

	const WriteOne = () => {
		while (i < sampleSize){
			for (let j = 0; j < Math.ceil(Math.random()*10); j++) {
				if (!WriteSign(i)) {
					return;
				}
			}
			let dateArr = generateDates();
			if (!wEventStream.write(`${i},${generateName()},${contact[Math.floor(Math.random()*4)]},${generateName()},${dateArr[0]},${dateArr[1]},${dateArr[2]},${dateArr[3]},${dateArr[4]},${Math.ceil(Math.random()*23)},${generateDate()},${generateEntry()}\n`)) {
				i++;
				return;
			}
			i++;
		}
		wEventStream.end();
		wSignStream.end();
	};

	const WriteSign = (i) => {
		return wSignStream.write(`${i},${generateName()},${contact[Math.floor(Math.random()*4)]},${generateName()},${generateEntry()} \n`)
	}

	wEventStream.on('drain', () => {
		WriteOne();
	});

	wSignStream.on('drain', () => {
		WriteOne();
	})

	WriteOne();