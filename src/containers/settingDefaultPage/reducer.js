const reducer = {
  fetch_owner_list_result: (
    state = { success: "", items: [], totalCount: 0 },
    action
  ) => {
		const keyword = "fetch_owner_list";
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
  fetch_user_admin_other_list_result: (
    state = { success: "", items: [], totalCount: 0 },
    action
  ) => {
		const keyword = "fetch_user_admin_other_list";
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
  delete_user_accounts_result: (
    state = {success: "", msg: ""},
    action
  ) => {
		const keyword = "delete_user_accounts";
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
  default_update_user_info_result: (
    state = {success: "", msg: ""},
    action
  ) => {
		const keyword = "default_update_user_info";
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
