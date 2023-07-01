import { ActionType } from "./types";
import { combineReducers } from "redux";
import { ActionObject } from "./actions";

export type chooseClassType = {
	type: string;
	payload: any;
};
export type chooseTicketType = {
	type: string;
	payload: any;
};
export type setTicketType = {
	type: string;
	payload: any;
};

const chooseClassState: chooseClassType = {
	type: "",
	payload: "",
};
const chooseTicketState: chooseTicketType = {
	type: "",
	payload: "",
};
const setTicketState: setTicketType = {
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
const chooseTicketReducer = async (
	state: chooseTicketType,
	action: ActionObject,
) => {
	switch (action.type) {
		case ActionType.CHOOSE_TICKET:
			return {
				type: ActionType.CHOOSE_TICKET,
				payload: action,
			};
	}
};
const setTicketReducer = async(state: setTicketType, action: ActionObject) => {
	switch (action.type) {
		case ActionType.SET_TICKET:
			return {
				type: ActionType.SET_TICKET,
				payload: action,
			};
	}
};

const rootReducer = combineReducers({
	chooseClassReducer,
	chooseTicketReducer,
	setTicketReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export { rootReducer };
