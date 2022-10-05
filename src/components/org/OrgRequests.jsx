import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import cookie from 'cookie';

import OrgTabs from './OrgTabs';
import '../../styles/VolRequests.css';

function VolRequests(props) {
	const cookies = cookie.parse(document.cookie);
	const { user } = props;
	// console.log('props are:', user);
	// state for accepted, declined and pending requests
	const [accepted, setAccepted] = useState([]);
	const [declined, setDeclined] = useState([]);
	const [pending, setPending] = useState([]);
	// state to determine if everything is loaded from fetch prior to render
	const [isLoaded, setIsLoaded] = useState(false);
	// state of the request by user id
	const [selectRequest, setSelectRequest] = useState({});
	// modal window state and functions for open and close
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	// handle the selected request by a given user
	const handleClick = (selectedReq) => {
		setSelectRequest(selectedReq);
	};

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
				// pushing requests into appropriate array
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
				// setting the state of the requests after fetch and set isLoaded
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
	// load getRequests
	useEffect(() => {
		getRequests();
	}, [cookies.jwt]);
	// handle whether a request is accepted
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
							<OrgTabs
								user={user}
								accepted={accepted}
								declined={declined}
								pending={pending}
								handleAccept={handleAccept}
								handleDecline={handleDecline}
								handleOpen={handleOpen}
								handleClose={handleClose}
								handleClick={handleClick}
								open={open}
								selectRequest={selectRequest}
							/>
						</div>
					</div>
				</div>
			</div>
		);
}

export default VolRequests;
