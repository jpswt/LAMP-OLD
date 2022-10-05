import React from 'react';
import { Link } from 'react-router-dom';
import volunteer from '../images/volunteer.jpg';
import org from '../images/org.jpg';
import '../styles/About.css';

import volunteer1 from '../images/volunteer1.png';
import enrollment from '../images/enrollment.png';
import advice from '../images/advice-icon.png';

//Content for the About Section of the Landing Page
function About() {
	return (
		//Content for the How to Use Lamp site
		<div className="about" id="about">
			<h2>
				We help volunteers and organizations connect to empower their community.{' '}
			</h2>
			<div className="howTo">
				<div className="howToBox">
					<div>
						<img src={enrollment} className="enroll" alt="" />
					</div>
					<h3>1. Volunteers</h3>
					<p>Create an account and search for an organization to work with.</p>
				</div>
				<div className="howToBox">
					<img src={advice} className="advice" alt="" />
					<h3>2. Send a Request</h3>
					<p>Share your interests, skills and availability.</p>
				</div>
				<div className="howToBox orphan">
					<img src={volunteer1} className="vol" alt="" />
					<h3>3. Partner with an Organization</h3>
					<p>Connect, meet and start volunteering!</p>
				</div>
			</div>
			<div className="container">
				<div className="col-2">
					<img src={volunteer} alt="volunteer needed" />
					<p>Volunteer your awesome skills to help others in your community.</p>
					<Link to="/register">
						<button className="button">Join Today</button>
					</Link>
				</div>
				<div className="col-2">
					<img src={org} alt="helping hands" />
					<p>
						Register your organization to connect with amazing volunteers ready
						to help.
					</p>
					<Link to="/register">
						<button className="button">Get Connected</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default About;
