import React from 'react';
import Router from './Router';
import { BrowserRouter } from 'react-router-dom';

function App() {
	return (
		<div>
			<BrowserRouter>
				{/* <NavBar /> */}
				<Router />
			</BrowserRouter>
		</div>
	);
}

export default App;
