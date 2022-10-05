import React, { useState } from 'react';
import TimePicker from 'react-time-picker';
import DatePicker from 'react-date-picker';
import cookie from 'cookie';
import axios from 'axios';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import { AiOutlineSend } from 'react-icons/ai';
import { FaRegHandPeace } from 'react-icons/fa';

import '../../styles/TimePicker.css';
import '../../styles/DatePicker.css';
import '../../styles/Calendar.css';
import '../../styles/SendRequest.css';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	// width: 400,
	bgcolor: 'background.paper',
	border: '3px solid var(--primary-color)',
	boxShadow: 24,
	p: 4,
};

// function that handles the user request to the organization
function SendRequest(props) {
	const cookies = cookie.parse(document.cookie);
	const { handleClose, selectOrg, open } = props;
	//state for input fields
	const [value, onChange] = useState('');
	// state for the date
	const [date, onChangeDate] = useState(new Date());
	// state for message field
	const [message, setMessage] = useState('');
	// state for the org selection
	const [select, setSelect] = useState('');
	// state for status message
	const [statusMsg, setStatusMsg] = useState('');
	// console.log('cookies are:', cookies);
	// console.log('PopUp', selectOrg.id);
	// console.log('Date Value', date);
	// console.log('time value', value);
	// console.log('Time Span is:', select);
	// console.log('My Message is:', message);

	// array for the time span drop down
	const timeSpanArr = ['0-1 hours', '1-2 hours', '3-4 hours', '4+ hours'];

	// function that converts time from 24hr to 12hr
	const convertTime = () => {
		let hours = value.slice(0, 2);
		let minutes = value.slice(-2);
		let AMOrPM = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12 || 12;
		let finalTime = `${hours}:${minutes} ${AMOrPM}`;

		return finalTime;
	};

	//function that converts date to a format the reads 'ex Jan 01, 1999'
	const convertDate = () => {
		let str = date.toString();
		let parts = str.split(' ');
		let months = {
			Jan: '01',
			Feb: '02',
			Mar: '03',
			Apr: '04',
			May: '05',
			Jun: '06',
			Jul: '07',
			Aug: '08',
			Sep: '09',
			Oct: '10',
			Nov: '11',
			Dec: '12',
		};
		let finalDate = `${months[parts[1]]}-${parts[2]}-${parts[3]}`;
		return finalDate;
	};

	// console.log('Final Date: ', convertDate(date));
	// handle input field change for message
	const handleInput = (e) => {
		setMessage(e.target.value);
	};
	//handle input change for input fields
	const handleChange = (e) => {
		setSelect(e.target.value);
	};
	// handle the send request to dB
	const handleRequest = (e) => {
		e.preventDefault();

		axios
			.post(
				'https://light-path.herokuapp.com/users/sendRequest',
				{
					org_id: selectOrg.id,
					start_date: convertDate(),
					start_time: convertTime(),
					time_span: select,
					message: message,
				},
				{ headers: { Authorization: cookies.jwt } }
			)
			.then((response) => {
				// console.log(response);
				setStatusMsg('Your request has been sent!');
				setTimeout(() => {
					setStatusMsg('');
					handleClose();
				}, 1500);
			})
			.catch((error) => {
				console.log(error);
				setStatusMsg(' Your request has not been sent.  Please try again.');
			});
		// clear all input fields
		onChange('');
		onChangeDate(new Date());
		setSelect('');
		setMessage('');
	};

	return (
		<div>
			<Modal
				open={open}
				// onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style} className="modalStyles">
					<h3>Send a Spark to: {selectOrg.name}</h3>
					<form onSubmit={handleRequest}>
						<p>What day are you available?</p>
						<DatePicker
							required
							onChange={onChangeDate}
							value={date}
							calendarIcon={null}
							clearIcon={null}
							format="M-d-y"
						/>
						<p>What time are you available?</p>
						<TimePicker
							required
							onChange={onChange}
							value={value}
							disableClock={true}
							// hourPlaceholder={'HH'}
							// minutePlaceholder={'MM'}
							format="hh:mm a"
						/>
						<p>How long would you like to volunteer?</p>
						{/* <FormControl fullWidth> */}
						{/* <InputLabel id="demo-simple-select-label">Time Span</InputLabel> */}
						<TextField
							required
							select
							defaultValue=""
							name="timeSpan"
							label="Choose time span"
							onChange={handleChange}
							sx={{ width: '12rem', padding: 0, margin: 'none' }}
						>
							{['', ...timeSpanArr].map((duration, index) => (
								<MenuItem value={duration} key={index}>
									{duration}
								</MenuItem>
							))}
						</TextField>
						{/* </FormControl> */}
						<p>Send us a message about your interest in volunteering!</p>
						<TextareaAutosize
							required
							aria-label="empty textarea"
							placeholder="Share your spark..."
							minRows={4}
							style={{ width: 700, fontSize: '1rem' }}
							name="message"
							onChange={handleInput}
							value={message}
						/>
						<div className="statusMsg">
							{statusMsg ? <p>{statusMsg}</p> : null}
						</div>
						<div className="btnContainer">
							<Button
								type="submit"
								variant="contained"
								endIcon={<AiOutlineSend />}
								className="btnStyles"
								sx={{
									'backgroundColor': 'var(--secondary-color)',
									'padding': '.5rem 1rem',
									'width': '6rem',
									':hover': {
										bgcolor: 'hsla(192, 36%, 45%, 1)', // theme.palette.primary.main
										color: 'white',
									},
									'transition': 'ease-in-out .3s',
								}}
							>
								Send
							</Button>
							<Button
								variant="contained"
								onClick={handleClose}
								endIcon={<FaRegHandPeace />}
								sx={{
									'backgroundColor': 'var(--secondary-color)',
									'padding': '.5rem 1rem',
									'width': '6rem',
									':hover': {
										bgcolor: 'hsla(192, 36%, 45%, 1)', // theme.palette.primary.main
										color: 'white',
									},
									'transition': 'ease-in-out .3s',
								}}
							>
								Close
							</Button>
						</div>
					</form>
				</Box>
			</Modal>
		</div>
	);
}

export default SendRequest;
