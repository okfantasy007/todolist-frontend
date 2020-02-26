const reducer = {
	fetch_unfinished_list_result: (state = {success: "", items: [], totalCount: 0},
																 action) => {
		const keyword = "fetch_unfinished_list";
		switch (action.type) {
			case `${keyword}_success`:
				return {
					success: true,
					items: action.payload.data.items,
					totalCount: action.payload.data.totalCount
				};
			case `${keyword}_fail`:
				return {
					success: false,
					items: [],
					totalCount: 0
				};
			case `init_${keyword}`:
				return {
					success: "",
					items: [],
					totalCount: 0
				};
			default:
				return state;
		}
	},
	fetch_finished_list_result: (state = {success: "", items: [], totalCount: 0},
															 action) => {
		const keyword = "fetch_finished_list";
		switch (action.type) {
			case `${keyword}_success`:
				return {
					success: true,
					items: action.payload.data.items,
					totalCount: action.payload.data.totalCount
				};
			case `${keyword}_fail`:
				return {
					success: false,
					items: [],
					totalCount: 0
				};
			case `init_${keyword}`:
				return {
					success: "",
					items: [],
					totalCount: 0
				};
			default:
				return state;
		}
	},
	fetch_admin_other_list_result: (state = {success: "", items: [], totalCount: 0},
																	action) => {
		const keyword = "fetch_admin_other_list";
		switch (action.type) {
			case `${keyword}_success`:
				return {
					success: true,
					items: action.payload.data.items,
					totalCount: action.payload.data.totalCount
				};
			case `${keyword}_fail`:
				return {
					success: false,
					items: [],
					totalCount: 0
				};
			case `init_${keyword}`:
				return {
					success: "",
					items: [],
					totalCount: 0
				};
			default:
				return state;
		}
	},
	delete_tasks_result: (state = {success: "", msg: ""},
												action) => {
		const keyword = "delete_tasks";
		switch (action.type) {
			case `${keyword}_success`:
				return {
					success: true
				};
			case `${keyword}_fail`:
				return {
					success: false,
					msg: action.payload.msg
				};
			case `init_${keyword}`:
				return {
					success: "",
					msg: ""
				};
			default:
				return state;
		}
	},
	default_update_task_result: (state = {success: "", msg: ""},
															 action) => {
		const keyword = "default_update_task";
		switch (action.type) {
			case `${keyword}_success`:
				return {
					success: true
				};
			case `${keyword}_fail`:
				return {
					success: false,
					msg: action.payload.msg
				};
			case `init_${keyword}`:
				return {
					success: "",
					msg: ""
				};
			default:
				return state;
		}
	}
};

export default reducer;
