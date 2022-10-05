import React, { useState } from 'react';
import RequestCard from './RequestCard';
import ReactPaginate from 'react-paginate';
import acceptedpic from '../../images/accepted.png';

import '../../styles/Requests.css';

function AcceptedRequests(props) {
	const { accepted } = props;
	// console.log('Pending props: ', props.accepted);

	// state for pagination
	const [pageNumber, setPageNumber] = useState(0);
	// sets request cards per page
	const requestsPerPage = 6;
	const pageVisited = pageNumber * requestsPerPage;
	const pageCount = Math.ceil(accepted.length / requestsPerPage);
	// handles the page selector
	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};
	// function that maps through the accepted requests to display on each page.
	const displayRequests = accepted
		.slice(pageVisited, pageVisited + requestsPerPage)
		.map((requests, index) => {
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
						<RequestCard
							key={index}
							name={requests.name}
							org_id={requests.org_id}
							start_date={requests.start_date}
							start_time={requests.start_time}
							time_span={requests.time_span}
							message={requests.message}
							created_on={date}
						/>
					</ol>
				</div>
			);
		});

	// if no accepted requests, displays that no requests are available
	if (accepted.length === 0) {
		return (
			<div className="imgContainer">
				<img src={acceptedpic} alt="No Accepted Requests" />
			</div>
		);
	}
	// if requests are under 7, display the cards with no pagination controls
	if (accepted.length < 7) {
		return <div className="requestGrid">{displayRequests}</div>;
		// else display cards with pagination controls
	} else {
		return (
			<div>
				<div className="requestGrid">{displayRequests}</div>
				<ReactPaginate
					previousLabel={'<'}
					nextLabel={'>'}
					pageCount={pageCount}
					onPageChange={changePage}
					containerClassName={'pagination'}
					activeClassName={'active'}
				/>
			</div>
		);
	}
}

export default AcceptedRequests;
