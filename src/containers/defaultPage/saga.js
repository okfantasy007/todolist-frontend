let saga = {};
//登录
saga["fetch_unfinished_list"] = {
  type: "post",
  path: "/todolist/list/unfinished"
};

saga["fetch_finished_list"] = {
  type: "post",
  path: "/todolist/list/finished"
};

saga["fetch_admin_other_list"] = {
  type: "post",
  path: "/todolist/list/admin_other"
};

saga["delete_tasks"] = {
  type: "post",
  path: "/todolist/delete"
};

saga["default_update_task"] = {
  type: "post",
  path: "/todolist/update"
};

export default saga;
