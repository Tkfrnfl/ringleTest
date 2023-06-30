import { ActionType } from "./types";
import { combineReducers } from "redux";
import { ActionObject } from "./actions";

export type chooseClassType = {
	type: string;
	payload: any;
};

const chooseClassState: chooseClassType = {
	type: "",
	payload: "",
};

const chooseClassReducer = async (
	state: chooseClassType,
	action: ActionObject,
) => {
	switch (action.type) {
		case ActionType.CHOOSE_CLASS:
			return {
				type: ActionType.CHOOSE_CLASS,
				payload: action,
			};
	}
};

const rootReducer = combineReducers({
	chooseClassReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export { rootReducer };
