const reducer = {
  login_result: (
    state = { user_name: "", id: "", msg: "", admin_flag: false, success: ""},
    action
  ) => {
  	const keyword = "login";
    switch (action.type) {
      case `${keyword}_success`:
        return {
          user_name: action.payload.data.user_name,
          id: action.payload.data.id,
          msg: "",
          admin_flag: action.payload.data.admin_flag,
					success: true
        };
      case `${keyword}_fail`:
        return {
          user_name: "",
          id: "",
          msg: action.payload.msg,
					admin_flag: false,
					success: false
        };
      case `init_${keyword}`:
				return {
					user_name: "",
					id: "",
					msg: "",
					admin_flag: false,
					success: ""
				};
      default:
        return state;
    }
  },
  logout_result: (
    state = { logout_success: false },
    action
  ) => {
		const keyword = "logout";
		switch (action.type) {
			case `${keyword}_success`:
				return {
					logout_success: true
				};
			case `${keyword}_fail`:
				return {
					logout_success: false
				};
			case `init_${keyword}`:
				return {
					logout_success: ""
				};
			default:
				return state;
		}
  }
};

export default reducer;
