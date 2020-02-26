const reducer = {
  update_user_info_result: (
    state = {success: "", msg: "", relogin: false},
    action
  ) => {
		const keyword = "update_user_info";
		switch (action.type) {
			case `${keyword}_success`:
        return {
          success: true,
          relogin: action.payload.relogin
        };
			case `${keyword}_fail`:
        return {
          success: false,
          msg: action.payload.msg
        };
			case `init_${keyword}`:
        return {
          success: "",
          msg: "",
          relogin: false
        };
      default:
        return state;
    }
  }
};

export default reducer;
