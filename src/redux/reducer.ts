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
	payload:any;
};
export type selectTutorType = {
	type: string;
	payload:any;
};

const chooseClassState: chooseClassType = {
	type: "",
	payload: "",
};
const chooseTicketState: chooseTicketType = {
	type: "",
	payload: {
		selectedTicket: 1,
	},
};
const setTicketState: setTicketType = {
	type: "",
	payload:{
		min20:1,
		min20Left:30,
		min40:1,
		min40Left:365
	}
};
const selectTutorState: selectTutorType = {
	type: "",
	payload:{
		img:""
	}
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
			console.log(action)
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

const selectTutorReducer = async(state: selectTutorType, action: ActionObject) => {
	switch (action.type) {
		case ActionType.SELECT_TUTOR:
			return {
				type: ActionType.SELECT_TUTOR,
				payload: action,
			};
	}
};

const rootReducer = combineReducers({
	chooseClassReducer,
	chooseTicketReducer,
	setTicketReducer,
	selectTutorReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export { rootReducer };
