import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import '../styles/Login.css';
import logoBW from '../images/lampbw-sm.png';
import loginImg from '../images/loginImg.jpg';
import axios from 'axios';

function Register() {
	const navigate = useNavigate();

	// state for new user
	const [newUser, setNewUser] = useState({
		name: '',
		username: '',
		email: '',
		password: '',
		// address: '',
		// phone: '',
		isOrg: '' || null,
		userCreated: false,
	});
	console.log(newUser);
	// state for error message if unable to register user
	const [errorMsg, setErrorMsg] = useState('');
	// state for register button to determine if all fields are selected
	const [disabled, setDisabled] = useState(true);
	// state to determine which type of user is selected (volunteer or org)
	const [active, setActive] = useState('');

	// handles the setting of which type of user is selected
	const handleClick = (e) => {
		setActive(e.target.id);
	};
	// handles if user has selected either vol or org (prevents registration unless one is selected)
	const checkClick = (e) => {
		let id = e.target.id;
		if (id === '1' || id === '2') {
			setDisabled(false);
		}
	};
	// handles input change in the input fields
	const handleChange = (e) => {
		const newUserInput = { ...newUser };
		newUserInput[e.target.name] = e.target.value;
		setNewUser(newUserInput);
	};
	// handles the assignment of the isOrg flag on dB
	const handleUserSelection = (e) => {
		if (e.target.innerText === 'Volunteer') {
			setNewUser((prev) => ({ ...prev, isOrg: 0 }));
		} else if (e.target.innerText === 'Non-Profit Org') {
			setNewUser((prev) => ({ ...prev, isOrg: 1 }));
		}
	};
	// if the user has registered as an organization, show the following form additions else do not show
	const showOrgForm = () => {
		if (newUser.isOrg === 1) {
			return (
				<>
					<TextField
						required
						onChange={handleChange}
						value={newUser.address}
						id="address"
						type="text"
						label="Address"
						placeholder="123 Main St Somewhere, USA 12345"
						name="address"
						variant="outlined"
						sx={{
							'& .MuiInputLabel-root.Mui-focused': { color: 'black' },
							'& .MuiOutlinedInput-root.Mui-focused': {
								'& > fieldset': { borderColor: 'orange' },
							},
							'marginBottom': '1rem',
							'width': '30ch',
						}}
					/>
					<TextField
						required
						onChange={handleChange}
						value={newUser.phone}
						id="phone"
						type="tel"
						label="Phone Number"
						placeholder="555-555-5555"
						name="phone"
						pattern="[0-9]{10}"
						variant="outlined"
						sx={{
							'& .MuiInputLabel-root.Mui-focused': { color: 'black' },
							'& .MuiOutlinedInput-root.Mui-focused': {
								'& > fieldset': { borderColor: 'orange' },
							},
							'marginBottom': '1rem',
							'width': '30ch',
						}}
					/>
					<TextField
						required
						onChange={handleChange}
						value={newUser.website}
						id="website"
						type="text"
						label="Website"
						placeholder="www.your-site.org"
						name="website"
						// pattern="[0-9]{10}"
						variant="outlined"
						sx={{
							'& .MuiInputLabel-root.Mui-focused': { color: 'black' },
							'& .MuiOutlinedInput-root.Mui-focused': {
								'& > fieldset': { borderColor: 'orange' },
							},
							'marginBottom': '1rem',
							'width': '30ch',
						}}
					/>
				</>
			);
		} else {
			return null;
		}
	};
	// handles registration of new user
	const handleRegister = (e) => {
		e.preventDefault();

		if (!newUser.isOrg) {
			axios
				.post('https://light-path.herokuapp.com/register/volunteer', {
					name: newUser.name,
					username: newUser.username,
					email: newUser.email,
					password: newUser.password,
					isOrg: newUser.isOrg,
				})
				.then((response) => {
					console.log(response);
					navigate('/login');
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			axios
				.post('https://light-path.herokuapp.com/register/org', {
					name: newUser.name,
					username: newUser.username,
					email: newUser.email,
					password: newUser.password,
					address: newUser.address,
					phone: newUser.phone,
					website: newUser.website,
					isOrg: newUser.isOrg,
				})
				.then((response) => {
					console.log(response);
					navigate('/login');
				})
				.catch((error) => {
					console.log(error);
					setErrorMsg(
						'Username/Email already exist.  Please try again or sign in.'
					);
				});
		}
	};

	return (
		<div className="login">
			<div className="content">
				<img
					className="image"
					src={loginImg}
					alt="man standing in field with sunset in background"
				/>
				<div className="col-2">
					<Paper
						elevation={4}
						sx={{
							padding: '1rem 0 1rem 0',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: 4,
							margin: '1rem 0 1rem 0',
						}}
					>
						<img className="logo" src={logoBW} alt="lamp logo" />
						<div className="selection">Choose one...</div>
						<div className="choose-user">
							<button
								key={1}
								className={active === '1' ? 'active' : undefined}
								id="1"
								onClick={(e) => {
									handleUserSelection(e);
									handleClick(e);
									checkClick(e);
								}}
							>
								Volunteer
							</button>
							<button
								key={2}
								className={active === '2' ? 'active' : undefined}
								id="2"
								name="organization"
								onClick={(e) => {
									handleUserSelection(e);
									handleClick(e);
									checkClick(e);
								}}
							>
								Non-Profit Org
							</button>
						</div>
						<Container
							sx={{
								marginTop: '1rem',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<form
								onSubmit={handleRegister}
								style={{
									width: '35ch',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}
							>
								<TextField
									required
									onChange={handleChange}
									value={newUser.name}
									id="name"
									type="text"
									label="Name"
									name="name"
									variant="outlined"
									sx={{
										'& .MuiInputLabel-root.Mui-focused': { color: 'black' },
										'& .MuiOutlinedInput-root.Mui-focused': {
											'& > fieldset': { borderColor: 'orange' },
										},
										'marginBottom': '1rem',
										'width': '30ch',
									}}
								/>
								<TextField
									required
									onChange={handleChange}
									value={newUser.username}
									id="username"
									type="text"
									label="Username"
									name="username"
									variant="outlined"
									sx={{
										'& .MuiInputLabel-root.Mui-focused': { color: 'black' },
										'& .MuiOutlinedInput-root.Mui-focused': {
											'& > fieldset': { borderColor: 'orange' },
										},
										'marginBottom': '1rem',
										'width': '30ch',
									}}
								/>
								<TextField
									required
									onChange={handleChange}
									value={newUser.email}
									id="email"
									type="email"
									label="Email"
									name="email"
									variant="outlined"
									sx={{
										'& .MuiInputLabel-root.Mui-focused': { color: 'black' },
										'& .MuiOutlinedInput-root.Mui-focused': {
											'& > fieldset': { borderColor: 'orange' },
										},
										'marginBottom': '1rem',
										'width': '30ch',
									}}
								/>
								<TextField
									required
									onChange={handleChange}
									value={newUser.password}
									id="password"
									type="password"
									label="Password"
									name="password"
									variant="outlined"
									sx={{
										'& .MuiInputLabel-root.Mui-focused': { color: 'black' },
										'& .MuiOutlinedInput-root.Mui-focused': {
											'& > fieldset': { borderColor: 'orange' },
										},
										'marginBottom': '1rem',
										'width': '30ch',
									}}
								/>
								{showOrgForm()}
								{disabled ? (
									<Tooltip
										title={
											<Typography fontSize={'1.0rem'}>
												Please select if you are a Volunteer or an Organization
											</Typography>
										}
										placement="top"
										arrow
										leaveTouchDelay={500}
										sx={{}}
									>
										<button
											id="submitbtn"
											className="button btn"
											type="submit"
											variant="contained"
											style={{ marginTop: '1rem' }}
											disabled={disabled}
										>
											<span>REGISTER</span>
										</button>
									</Tooltip>
								) : (
									<button
										id="submitbtn"
										className="button btn"
										type="submit"
										variant="contained"
										style={{ marginTop: '1rem' }}
										// disabled={disabled}
									>
										<span>REGISTER</span>
									</button>
								)}

								{errorMsg ? <p className="error">{errorMsg}</p> : null}
							</form>
							<span>
								Already a Member? <Link to="/login">Sign in</Link>
							</span>
						</Container>
					</Paper>
				</div>
			</div>
		</div>
	);
}

export default Register;
