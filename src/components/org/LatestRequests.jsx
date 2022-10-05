import React, { useState } from 'react';
import OrgRequestCard from './OrgRequestCard';
import Details from './Details';
import newReq from '../../images/newReq.png';

import '../../styles/Requests.css';

function LatestRequests(props) {
	const { pending, handleAccept, handleDecline } = props;
	// console.log('all request props: ', props.pending);
	// state for selected user request, used for details modal
	const [selectRequest, setSelectRequest] = useState({});
	// state and function for user details modal
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	// handles the selection of the user request to determine which details to show
	const handleClick = (selectedReq) => {
		setSelectRequest(selectedReq);
	};
	// map over the pending requests and show only the first three most recent
	const displayRequests = pending.slice(0, 3).map((requests, index) => {
		let daySent = requests.created_on;
		let date =
			daySent.slice(5, 7) +
			'-' +
			daySent.slice(8, 10) +
			'-' +
			daySent.slice(0, 4);
		return (
			<div className="requestContainer" key={index}>
				<ol>
					<OrgRequestCard
						key={index}
						id={requests.id}
						name={requests.name}
						email={requests.email}
						request_id={requests.id}
						start_date={requests.start_date}
						start_time={requests.start_time}
						time_span={requests.time_span}
						message={requests.message}
						created_on={date}
						isAccepted={requests.accepted}
						handleAccept={handleAccept}
						handleDecline={handleDecline}
						handleOpen={handleOpen}
						handleClick={() => handleClick(requests)}
					/>
				</ol>
				<div className="modalContainer">
					<Details
						handleClose={handleClose}
						details={selectRequest}
						open={open}
					/>
				</div>
			</div>
		);
	});
	// if no latest requests are available, it will display no requests are available
	if (pending.length === 0) {
		return (
			<div className="imgContainer1">
				<img src={newReq} alt="No new requests" />
			</div>
		);
	}
	// else it will display the latest requests
	return (
		<div>
			<div className="requestGrid">{displayRequests}</div>
		</div>
	);
}

export default LatestRequests;
