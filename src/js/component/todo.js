import React, { useState } from "react";

export const Todo = () => {
	let [counter, setCounter] = useState(0);
	const [tasks, setTasks] = useState("");
	const [list, setList] = useState([]);
	const [state, setState] = useState("");

	const handler = event => {
		setState(event.key);
		if (state == "Enter") {
			agregar();
		}
	};
	function eliminar() {
		setCounter(counter - 1);
	}

	function agregar() {
		setList([...list, tasks]);
		setCounter(counter + 1);
	}

	return (
		<div>
			<ul className="list-group">
				<li className="list-group-item">
					<input
						type="text"
						className="form-control"
						id="todo"
						placeholder="What needs to be done?"
						onChange={e => setTasks(e.target.value)}
						onKeyPress={e => handler(e)}
						value={tasks}></input>
				</li>
				{list.map((item, index) => {
					return (
						<li key={index} className="list-group-item">
							{item}
							<i className="fas fa-times" onClick={eliminar}></i>
						</li>
					);
				})}
				<li className="list-group-item">
					<small>
						{"" +
							(counter == 0
								? "No tasks, add a task"
								: counter + " items left")}
					</small>
				</li>
			</ul>
		</div>
	);
};
