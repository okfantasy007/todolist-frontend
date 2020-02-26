const registerReducer = {
  register_result: (
    state = { success: "", user_name: "", id: "", msg: ""},
    action
  ) => {
		const keyword = "register";
		switch (action.type) {
			case `${keyword}_success`:
        return {
					success: true,
          user_name: action.payload.data.user_name,
          id: action.payload.data.id
        };
			case `${keyword}_fail`:
        return {
					success: false,
					user_name: "",
          id: "",
          msg: action.payload.msg
        };
			case `init_${keyword}`:
				return {
					success: "",
					user_name: "",
					id: "",
					msg: ""
				};
      default:
        return state;
    }
  }
};

export default registerReducer;
