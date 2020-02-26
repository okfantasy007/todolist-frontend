import React, {Component} from "react";

class ErrorBoundary extends Component {
	constructor() {
		super();
		this.state = {
			error: false
		}
	}

	componentWillMount() {

	};

	componentDidMount() {
		console.log("login mounted");
	}

	componentWillReceiveProps(nextProps) {

	}

	componentDidUpdate() {

	}

	componentWillUnmount() {
	}

	componentDidCatch(error, info) {
		/*console.log(error, info);
		alert("error");
		if (error) {
			this.setState({
				error: true
			});
		}*/
	}

	render() {
		const {error} = this.state;
		if (error) {
			return <div>Error</div>;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
