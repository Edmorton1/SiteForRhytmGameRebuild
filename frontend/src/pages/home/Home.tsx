import {useEffect, useState} from 'react';
import axios from 'axios';

export const Home = () => {
	const [state, setState] = useState([]);

	useEffect(() => {
		axios.get('https://jsonplaceholder.typicode.com/todos').then((data) => setState(data.data));

		return;
	});

	return state.map((item) => {
		return (
			<div key={item.id}>
				<p>userId: {item.userId}</p>
				<p>id: {item.id}</p>
				<p>title: {item.title}</p>
				<p>completed: {item.completed.toString()}</p>
			</div>
		);
	});
};
