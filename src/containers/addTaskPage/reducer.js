const reducer = {
  add_task_result: (
    state = {success: "", msg: ""},
    action
  ) => {
		const keyword = "add_task";
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
  update_task_result: (
    state = {success: "", msg: ""},
    action
  ) => {
		const keyword = "update_task";
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
