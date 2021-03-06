import React from "react";
import { Todo } from "./todo";

//include images into your bundle

//create your first component
export function Home() {
	return (
		<div className="text-center mt-5">
			<h1>Todo&apos;s</h1>
			<div className="row">
				<div className="col-3"></div>
				<div className="col-6">
					<Todo />
				</div>
				<div className="col-3"></div>
			</div>
		</div>
	);
}
