import { ActionType } from "./types";

const chooseClass = (selectedSlot: Date, hourString: string) => {
	return {
		type: ActionType.CHOOSE_CLASS,
		payload: {
			selectedSlot: selectedSlot,
			hourString: hourString,
		},
	};
};
const chooseTicket = (selectedTicket:number) => {
	return {
		type: ActionType.CHOOSE_TICKET,
		payload: {
			selectedTicket: selectedTicket,
		},
	};
};
const setTicket = () => {
	return {
		type: ActionType.SET_TICKET,
		payload:{
			min20:1,
			min20Left:30,
			min40:1,
			min40Left:365,
		},
	};
};

type ActionObject =
	| ReturnType<typeof chooseClass>
	| ReturnType<typeof setTicket>
	| ReturnType<typeof chooseTicket>;

export { chooseClass, setTicket,chooseTicket };
export type { ActionObject };
