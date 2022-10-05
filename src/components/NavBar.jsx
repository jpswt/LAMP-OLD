import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import { checkAuth } from '../Router';

import '../styles/NavBar.css';

const NavBar = () => {
	const navigate = useNavigate();
	const [click, setClick] = useState(false);
	// state of user click on NavBar
	const handleClick = () => setClick(!click);
	// State of the navBar in Mobile view
	const closeMenu = () => setClick(false);
	// state of navBar color onScroll
	const [color, setColor] = useState(false);

	const changeColor = () => {
		if (window.scrollY >= 40) {
			setColor(true);
		} else {
			setColor(false);
		}
	};
	// function for user logout
	const loggedOut = (e) => {
		document.cookie = 'loggedIn=';
		document.cookie = 'jwt=';
		navigate('/');
		localStorage.clear();
		closeMenu();
	};
	// changes color of NavBar on scroll
	window.addEventListener('scroll', changeColor);
	// checks if user is logged in and returns specific layout of NavBar
	return checkAuth() ? (
		<div className={color ? 'header header-bg' : 'header'}>
			<nav className="navbar">
				<a href="/" className="logo">
					<img src={logo} alt="logo" />
				</a>
				<div className="hamburger" onClick={handleClick}>
					{click ? (
						<FaTimes size={30} style={{ color: '#ffffff' }} />
					) : (
						<FaBars size={30} style={{ color: '#ffffff' }} />
					)}
				</div>
				<ul className={click ? 'nav-menu active' : 'nav-menu'}>
					<li className="nav-item">
						<Link to="/dashboard" onClick={closeMenu}>
							My SparkBoard
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/sparks" onClick={closeMenu}>
							My Sparks
						</Link>
					</li>
					<li className="nav-item">
						<Link
							to="/"
							onClick={() => {
								closeMenu();
								loggedOut();
							}}
						>
							Logout
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	) : (
		// if user not logged it, will return this version of NavBar
		<div className={color ? 'header header-bg' : 'header'}>
			<nav className="navbar">
				<a href="/" className="logo">
					<img src={logo} alt="logo" />
				</a>
				<div className="hamburger" onClick={handleClick}>
					{click ? (
						<FaTimes size={30} style={{ color: '#ffffff' }} />
					) : (
						<FaBars size={30} style={{ color: '#ffffff' }} />
					)}
				</div>
				<ul className={click ? 'nav-menu active' : 'nav-menu'}>
					<li className="nav-item">
						<a href="#hero" onClick={closeMenu}>
							Home
						</a>
					</li>
					<li className="nav-item">
						<a href="#about" onClick={closeMenu}>
							About
						</a>
					</li>
					<li className="nav-item">
						<Link to="/login" onClick={closeMenu}>
							Login
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default NavBar;
