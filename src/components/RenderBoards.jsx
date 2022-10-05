import React, { useEffect, useState } from 'react';
import VolBoard from './volunteer/VolBoard';
import NavBar from './NavBar';
import OrgBoard from './org/OrgBoard';
import axios from 'axios';
import cookie from 'cookie';

// handles which user dashboard to show based on user credentials
const RenderBoards = () => {
	const cookies = cookie.parse(document.cookie);

	const [user, setUser] = useState({
		id: '',
		name: '',
		username: '',
		email: '',
		isOrg: null,
	});

	async function getUser() {
		await axios
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
	}

	useEffect(() => {
		getUser();
	}, []);
	// if user's token shows they are not an organization, display this board
	if (user.isOrg === 0)
		return (
			<div>
				<NavBar />
				<VolBoard user={user} />
			</div>
		);
	// else if they are an organization display this board
	else {
		if (user.isOrg === 1)
			return (
				<div>
					<NavBar />
					<OrgBoard user={user} />
				</div>
			);
	}
};

export default RenderBoards;
