import { ActionType } from "./types";

const chooseClass = (selectedSlot: Date) => {
	return {
		type: ActionType.CHOOSE_CLASS,
		payload: {
			selectedSlot: selectedSlot,
		},
	};
};

type ActionObject = ReturnType<typeof chooseClass>;

export { chooseClass };
export type { ActionObject };
