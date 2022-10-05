import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'cookie';
import LatestRequests from './LatestRequests';

import '../../styles/Board.css';

function OrgBoard(props) {
	const cookies = cookie.parse(document.cookie);
	const { user } = props;
	// console.log('props are:', user);

	// state for accepted, declined and pending volunteer requests
	const [accepted, setAccepted] = useState([]);
	const [declined, setDeclined] = useState([]);
	const [pending, setPending] = useState([]);
	// state to determine if everything is loaded from fetch prior to render
	const [isLoaded, setIsLoaded] = useState(false);
	// function that gets requests and places them in appropriate arrays
	async function getRequests() {
		await axios
			.get(`https://light-path.herokuapp.com/users/orgRequest`, {
				headers: {
					Authorization: cookies.jwt,
				},
			})
			.then((response) => {
				let accepted = [];
				let declined = [];
				let pending = [];
				//pushing requests into array
				response.data.map((requests) => {
					switch (requests.accepted) {
						case 1:
							accepted.push(requests);
							break;
						case 0:
							declined.push(requests);
							break;
						default:
							pending.push(requests);
							break;
					}
				});
				//setting the state of the requests after fetch and set isLoaded
				setAccepted(accepted);
				setDeclined(declined);
				setPending(pending);
				setIsLoaded(true);

				// console.log(response.data);
				// console.log('pending', pending);
				// console.log('accepted', accepted);
				// console.log('declined', declined);
			})
			.catch((error) => {
				console.log(error);
			});
	}
	// load getRequest
	useEffect(() => {
		getRequests();
	}, [cookies.jwt]);
	// handles whether a request is accepted
	const handleAccept = (e) => {
		axios
			.put(
				`https://light-path.herokuapp.com/users/acceptReq`,
				{
					id: e.target.id,
				},
				{ headers: { Authorization: cookies.jwt } }
			)
			.then(() => {
				getRequests();
			})
			.catch((err) => {
				console.log('Accept Error', err);
			});
	};
	// handle whether a request is declined
	const handleDecline = (e) => {
		axios
			.put(
				`https://light-path.herokuapp.com/users/declineReq`,
				{
					id: e.target.id,
				},
				{ headers: { Authorization: cookies.jwt } }
			)
			.then(() => {
				getRequests();
			})
			.catch((err) => {
				console.log('Decline Error', err);
			});
	};
	// if everything is loaded then render board
	if (!isLoaded) {
		return <></>;
	} else
		return (
			<div>
				<div className="volRequest">
					<div className="content">
						<div className="main">
							<h3>
								{user.name.charAt(0).toUpperCase()}
								{user.name.slice(1)}'s SparkBoard
							</h3>
							{/* <h2>Newest Requests</h2> */}
							<div className="requestBox">
								<LatestRequests
									pending={pending}
									handleAccept={handleAccept}
									handleDecline={handleDecline}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
}

export default OrgBoard;
