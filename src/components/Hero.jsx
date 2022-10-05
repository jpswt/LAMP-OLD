import React from 'react';
import '../styles/Hero.css';
import { Link } from 'react-router-dom';

// Content for Hero section of Landing Page
function Hero() {
	return (
		<div className="hero" id="hero">
			<div className="content">
				<p>Become a Volunteer</p>
				<p>Use your spark to light a path in your community</p>
				<Link to="/register">
					<button className="button">Get Started</button>
				</Link>
			</div>
		</div>
	);
}

export default Hero;
