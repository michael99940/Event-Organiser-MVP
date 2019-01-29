const formStyle = {
	display: 'grid',
};

const formEntry1 = {
	gridColumn: '1',
};

const formEntry2 = {
	gridColumn: '2',
};

const formEntry3 = {
	gridColumn: '3',
};

const formEntry4 = {
	gridColumn: '4',
};

const generalButton = {
	cursor: 'pointer',
  padding: '0px',
  margin: '0px',
};

const containerDiv = {
	zIndex: '100000000',
	position: 'sticky',
	top: '20px',
	left: '20px'
};

const absoluteDiv = {
	position: 'absolute',
	top: '20px',
	right: '20px',
};

const fonts = {
	fontFamily: 'Circular,"Helvetica Neue",Helvetica,Arial,sans-serif',
}
const createRow1 = {
	gridColumn: '1/3',
};

const createRow2 = {
	gridColumn: '3/5',
};

const createRow3 = {
	gridColumn: '5/7',
};

const createFormEntry1 = {
	gridColumn: '1',
};

const createFormEntry2 = {
	gridColumn: '2',
};

const createFormEntry3 = {
	gridColumn: '3',
};

const createFormEntry4 = {
	gridColumn: '4',
};

const createFormEntry5 = {
	gridColumn: '5',
};

const createFormEntry6 = {
	gridColumn: '6',
};

const createFormEntryText = {
	gridColumn: '2/5',
};

const createFormHeader = Object.assign({
  fontSize: '36px',
	textAlign: 'center', 
	gridColumn:'3/5',
}, fonts);

const eventFormStyle = Object.assign({
	gridTemplateColumns: '100px 100px 100px 200px',
}, formStyle, fonts);

const createFormStyle = Object.assign({
	borderWidth: '40px',
	borderRadius: '20px',
	borderStyle: 'solid',
	borderColor: '#d9d9d9',
	gridTemplateColumns: 'auto auto auto auto auto auto',
	gridColumnGap: '10px',
	gridRowGap: '10px',
}, formStyle, fonts);

const eventContainer = Object.assign({
	gridTemplateColumns: 'auto auto auto',
	gridColumnGap: '20px',
	maxWidth: '700px',
	borderStyle: 'solid',
	borderRadius: '20px',
}, formStyle, fonts);

const event1 = {
	gridColumn: '1',
};

const event2 = {
	gridColumn: '2',
};

const event3 = {
	gridColumn: '1',
};

const event4 = {
	gridColumn: '2/3',
};

const header = {
	position: 'relative',
	left: '50px',
}

const updateButton = Object.assign({
	fontSize: '50px',
	backgroundColor: 'white',
  top: '0',
  left: '0',
  borderRadius: '5px',
  width: '70px',
  height: '70px',
}, generalButton)

const formButton1 = Object.assign({

}, generalButton, fonts);


const formButton2 = Object.assign({
	gridColumn: '1',
	maxWidth: '130px',
	maxHeight: '20px',
	position: 'relative',
	bottom: '5px',
	left: '5px',
}, generalButton, fonts);

const createFormButton = Object.assign({
	display: 'block',
	position: 'relative',
	top: '-30px',
	right: '-20px',
	cursor: 'pointer'
}, fonts);




module.exports = {
	eventFormStyle,
	createFormStyle,
	formEntry1,
	formEntry2,
	formEntry3,
	formEntry4,
	formButton1,
	formButton2,
	containerDiv,
	absoluteDiv,
	createFormEntry1,
	createFormEntry2,
	createFormEntry3,
	createFormEntry4,
	createFormEntry5,
	createFormEntry6,
	createFormEntryText,
	createRow1,
	createRow2,
	createRow3,
	createFormHeader,
	createFormButton,
	fonts,
	header,
	updateButton,
	eventContainer,
	event1,
	event2,
	event3,
	event4
}