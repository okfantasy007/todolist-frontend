import React, {useState, useEffect} from "react";

function Hook() {
	// 声明一个新的叫做 “count” 的 state 变量
	const [count, setCount] = useState(2);
	const [timerCount, setTimerCount] = useState(0);

	// 不需要清除的副作用
	useEffect(() => {
		document.title = `${count} times clicked`;
	});

	// 需要清除的副作用
	useEffect(() => {
		const timer = setInterval(() => {
			setTimerCount(timerCount + 1);
		}, 1000);
		return function() {
			clearInterval(timer);
		}
	});

	return (
		<div>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>
				Click me
			</button>
			<span>timer: {timerCount}</span>
		</div>
	);
}

export default Hook;