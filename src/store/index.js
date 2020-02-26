import { combineReducers } from "redux";
import loginReducer from "../views/login/reducer";
import registerReducer from "../views/register/reducer";
import defaultPageReducer from "@/containers/defaultPage/reducer";
import addTaskPageReducer from "@/containers/addTaskPage/reducer";
import settingPageReducer from "@/containers/settingPage/reducer";
import settingDefaultPageReducer from "@/containers/settingDefaultPage/reducer";
import updateUserInfoPageReducer from "@/containers/updateUserInfoPage/reducer";

const rootReducer = combineReducers({
  ...loginReducer,
  ...registerReducer,
  ...defaultPageReducer,
  ...addTaskPageReducer,
  ...settingPageReducer,
  ...settingDefaultPageReducer,
  ...updateUserInfoPageReducer
});

export  { rootReducer };
