import React, { useState } from "react";

export const Todo = () => {
	let [counter, setCounter] = useState(0);
	const [tasks, setTasks] = useState("");
	const [list, setList] = useState([]);

	const deleteTask = indexDelete => {
		let resultado = list.filter((tasks, index) => index != indexDelete);
		setList(resultado);
		setCounter(counter - 1);
	};

	function agregar(e) {
		setTasks(e);
	}
	const agregarLista = e => {
		if (tasks != "") {
			if (e.key == "Enter") {
				setCounter(counter + 1);
				setList([...list, tasks]);
				setTasks("");
			}
		}
	};

	return (
		<div>
			<ul className="list-group">
				<li className="list-group-item">
					<input
						type="text"
						className="form-control"
						id="todo"
						placeholder="What needs to be done?"
						onChange={e => agregar(e.target.value)}
						onKeyPress={agregarLista}
						value={tasks}></input>
				</li>
				{list.map((item, index) => {
					return (
						<li
							key={index}
							className="list-group-item"
							id="distintor">
							{item}
							<i
								className="fas fa-times"
								onClick={() => {
									deleteTask(index);
								}}></i>
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
