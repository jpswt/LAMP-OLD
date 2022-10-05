import React from 'react';
import NavBar from './NavBar';
import Hero from './Hero';
import About from './About';
import cookie from 'cookie';

// function for the Landing page of Lamp
function Home() {
	document.cookie = cookie.serialize('loggedIn', null, {
		maxAge: 0,
	});
	document.cookie = cookie.serialize('jwt', null, { maxAge: 0 });
	return (
		<div>
			<NavBar />
			<Hero />
			<About />
		</div>
	);
}

export default Home;
