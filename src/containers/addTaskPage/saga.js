let addTaskPageSaga = {};

addTaskPageSaga["add_task"] = {
  type: "post",
  path: "/todolist/add"
};

addTaskPageSaga["update_task"] = {
  type: "post",
  path: "/todolist/update"
};

export default addTaskPageSaga;
