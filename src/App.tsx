import React, { useEffect, useRef, useState } from "react";
import TimeFirst from "./component/timeFirstPage";
import "../src/css/index.css";
import ChooseTicketModal from "./component/timeFirst/chooseTicketModal";
import { RootState } from "./redux/reducer";
import { useDispatch } from "react-redux";
import { setTicket } from "./redux/actions";

function App() {
	
	const [modalOpen, setModalOpen] = useState(true);
	const dispatch=useDispatch()
	const closeModal = () => {
		setModalOpen(false);
	};
	useEffect(()=>{
		dispatch(setTicket());
	},[])

	return (
		<div className="element">
			<ChooseTicketModal open={modalOpen} close={closeModal} ></ChooseTicketModal>
			<TimeFirst />
		</div>
	);
}

export default App;
