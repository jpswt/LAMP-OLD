import React, { useState } from 'react';
import RequestCard from './RequestCard';
import ReactPaginate from 'react-paginate';
import declinedpic from '../../images/declined.png';

import '../../styles/Requests.css';

function DeclinedRequests(props) {
	const { declined } = props;
	// console.log('Pending props: ', props.declined);

	// state for pagination
	const [pageNumber, setPageNumber] = useState(0);

	// sets request cards per page
	const requestsPerPage = 6;
	const pageVisited = pageNumber * requestsPerPage;
	const pageCount = Math.ceil(declined.length / requestsPerPage);
	// handles the page selector
	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};

	// function that maps through the declined requests to display on each page.
	const displayRequests = declined
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
	// if no declined requests, displays that no requests are available
	if (declined.length === 0) {
		return (
			<div className="imgContainer">
				<img src={declinedpic} alt="No Declined Requests" />
			</div>
		);
	}
	// if requests are under 7, display the cards with no pagination controls
	if (declined.length < 7) {
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

export default DeclinedRequests;
