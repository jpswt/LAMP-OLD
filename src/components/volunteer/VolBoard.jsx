import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'cookie';
import { Wrapper } from '@googlemaps/react-wrapper';

import Map from './Map';
import SendRequest from './SendRequest';
import OrgInfo from '../org/OrgsCard';

import '../../styles/Board.css';
import '../../styles/TimePicker.css';

function VolBoard(props) {
	const cookies = cookie.parse(document.cookie);
	const { user } = props;
	// console.log('props', user);

	// state for all of the organizations fro dB
	const [allOrgs, setAllOrgs] = useState([]);
	// state for a select organization
	const [selectOrg, setSelectOrg] = useState('');

	// state for the modal window and open/close functions
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		axios
			.get('https://light-path.herokuapp.com/users/orgsList', {
				headers: {
					Authorization: cookies.jwt,
				},
			})
			.then((response) => {
				let allOrgs = [];
				response.data.map((orgs) => {
					allOrgs.push(orgs);
				});
				setAllOrgs(response.data);
				// console.log('Response.data', response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	// handles the selection of a particular organization
	const handleClick = (e) => {
		// console.log('click allOrgs is:', allOrgs);
		for (let i = 0; i < allOrgs.length; i++) {
			if (allOrgs[i].username === e.target.id) {
				setSelectOrg(allOrgs[i]);
				// console.log('All orgs I', allOrgs[i]);
			}
		}
	};

	// console.log('list of allOrgs', allOrgs);

	return (
		<div>
			{/* <NavBar /> */}
			<div className="Board">
				<div className="content">
					<div className="main">
						<h3>
							{user.name.charAt(0).toUpperCase()}
							{user.name.slice(1)}'s SparkBoard
						</h3>
						<div className="mapBox">
							<Wrapper
								apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
								allOrgs={allOrgs}
							>
								<Map allOrgs={allOrgs} selectOrg={selectOrg} />
							</Wrapper>
						</div>
						<div className="orgCard">
							<ol>
								{allOrgs.map((org) => (
									<OrgInfo
										key={org.name}
										id={org.username}
										username={org.username}
										name={org.name}
										email={org.email}
										address={org.address}
										phone={org.phone}
										website={org.website}
										handleOpen={handleOpen}
										handleClick={handleClick}
										selectOrg={selectOrg}
									/>
								))}
							</ol>
						</div>
					</div>
					<div>
						<SendRequest
							handleClose={handleClose}
							selectOrg={selectOrg}
							open={open}
							user={user}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VolBoard;
