import React, { useEffect, useState } from 'react';
import VolRequests from './volunteer/VolRequests';
import NavBar from './NavBar';
import OrgRequests from './org/OrgRequests';
import axios from 'axios';
import cookie from 'cookie';

// function that handles which user requests to display
const RenderRequests = () => {
	const cookies = cookie.parse(document.cookie);
	const [user, setUser] = useState({
		id: '',
		name: '',
		username: '',
		email: '',
		isOrg: null,
	});

	useEffect(() => {
		axios
			.get('https://light-path.herokuapp.com/users/user', {
				headers: {
					Authorization: cookies.jwt,
				},
			})
			.then((response) => {
				setUser(response.data[0]);
				// console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [cookies.jwt]);
	// if user in not an organization, show the volunteer requests
	if (user.isOrg === 0)
		return (
			<div>
				<NavBar />
				<VolRequests user={user} />
			</div>
		);
	// else shoe the organizations requests
	else {
		return (
			<div>
				<NavBar />
				<OrgRequests user={user} />
			</div>
		);
	}
};

export default RenderRequests;
