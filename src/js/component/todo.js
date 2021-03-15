import React, { useState, useEffect } from "react";

export const Todo = () => {
	const [tasks, setTasks] = useState("");
	const [list, setList] = useState([]);

	useEffect(() => {
		getList();
	}, []);

	//funcion get para UseEffect
	const getList = () => {
		let fetchUrl = "https://assets.breatheco.de/apis/fake/todos/user/angie";
		fetch(fetchUrl)
			.then(response => response.json())
			.then(fetchBody => {
				setList(
					fetchBody.map(item => {
						return { label: item.label, done: item.done };
					})
				);
			})
			.catch(error => console.log("error", error));
	};

	//funcion put para fetch
	const putFetch = listTaskNew => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify(listTaskNew);

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/angie",
			requestOptions
		)
			.then(response => response.json())
			.then(result => {
				console.log(result);
				alert(result.result);
			})
			.catch(error => console.log("error", error));
	};

	//metodo eliminar
	const deleteTask = indexDelete => {
		let resultado = list.filter((tasks, index) => index != indexDelete);
		setList(resultado);
		//se actualiza la lista en el api
		putFetch(resultado);
	};

	//funcion onChange para controlar lo que se va escribiendo en tasks
	function agregar(e) {
		setTasks(e);
	}
	//funcion para agregar task a la lista de tareas
	const agregarLista = e => {
		if (tasks != "") {
			if (e.key == "Enter") {
				setList([...list, { label: tasks, done: false }]);
				//se actualiza la lista de la api
				console.log(list);
				//putFetch(list);
				setTasks("");
			}
		}
	};

	//funcion para eliminar todos los elementos de la lista
	const eliminarTodo = () => {
		var requestOptions = {
			method: "DELETE",
			redirect: "follow"
		};
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/angie",
			requestOptions
		)
			.then(response => response.json())
			.then(result => console.log(result))
			.then(newTodo())
			.catch(error => console.log("error", error));
	};

	//funcion para metodo post, luego de hacer delete all
	const newTodo = () => {
		let array = [];
		fetch("https://assets.breatheco.de/apis/fake/todos/user/angie", {
			method: "POST",
			body: JSON.stringify(array),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				console.log("newToDo", data);
				getList();
			}) //cargando la lista
			.catch(error => console.error("Error:", error.message));
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
							{item.label}
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
							(list.length == 0
								? "No tasks, add a task"
								: list.length + " items left")}
					</small>
				</li>
			</ul>
			<div id="hoja1" className="shadow"></div>
			<div id="hoja2" className="shadow"></div>
			<button
				className="btn btn-secondary"
				id="del"
				onClick={eliminarTodo}>
				Delete all elements on the list
			</button>
			<button
				type="button"
				className="btn btn-rosa"
				onClick={() => {
					putFetch(list);
				}}>
				Update List
			</button>
		</div>
	);
};
