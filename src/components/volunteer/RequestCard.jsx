import React from 'react';
import '../../styles/RequestCard.css';

// function for the card to display the request information
function RequestCard(props) {
	const { name, start_date, start_time, time_span, created_on } = props;
	// console.log('RequestCard props: ', props);

	return (
		<div className="requestCard">
			<li>
				<div className="titleBar">
					<p>{name}</p>
				</div>
				<p>
					<span>Sent on: </span> {created_on}
				</p>
				<p>
					<span>Start Date: </span> {start_date}{' '}
				</p>
				<p>
					<span>Start Time: </span>
					{start_time}
				</p>
				<p>
					<span>Duration: </span>
					{time_span}
				</p>
			</li>
		</div>
	);
}

export default RequestCard;
