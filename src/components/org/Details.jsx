import React from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { Button } from '@mui/material';

import '../../styles/Details.css';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	minWidth: '50%',
	bgcolor: 'var(--accent-color)',
	border: '4px solid var(--secondary-color)',
	boxShadow: 24,
	p: 4,
};
// function that displays the user request information in modal window
function Details(props) {
	const { handleClose, open, details } = props;
	// console.log('details are:', details);

	return (
		<div className="modalContainer">
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style} className="modal">
					<p>
						<span>Username: </span>
						{details.username}
					</p>
					<p>
						<span>Email:</span>{' '}
						<a href={'mailto:' + details.name}>{details.email}</a>
					</p>
					<p>
						<span>Available on: </span>
						{details.start_date}
					</p>
					<p>
						<span>Starting at: </span>
						{details.start_time}
					</p>
					<p>
						<span>Available for:</span> {details.time_span}
					</p>
					<p>
						<span>Message: </span>
						{details.message}
					</p>
				</Box>
			</Modal>
		</div>
	);
}

export default Details;
