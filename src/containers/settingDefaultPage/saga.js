let settingDefaultPageSaga = {};
//登录
settingDefaultPageSaga["fetch_owner_list"] = {
  type: "post",
  path: "/user/list"
};

settingDefaultPageSaga["fetch_user_admin_other_list"] = {
  type: "post",
  path: "/user/list/admin_other"
};

settingDefaultPageSaga["delete_user_accounts"] = {
  type: "post",
  path: "/user/delete"
};
settingDefaultPageSaga["default_update_user_info"] = {
  type: "post",
  path: "/user/update"
};

export default settingDefaultPageSaga;
