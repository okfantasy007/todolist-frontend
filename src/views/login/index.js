import React, {Component} from "react";
import LoginErrorBoundary from "./LoginErrorBoundary";
import Login from "./Login";
// eslint-disable-next-line
import Hook from "../hook";

class Comp extends Component {

	componentWillMount() {

	};

	componentDidMount() {

	}

	componentWillReceiveProps() {
		console.log("componentWillReceiveProps");
	}

	componentDidUpdate() {

	}

	componentWillUnmount() {
	}

	render() {
		return (
			<LoginErrorBoundary>
				<Login/>
				{/*<Hook/>*/}
			</LoginErrorBoundary>
		);
	}
}

export default Comp;
