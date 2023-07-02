import React, { useEffect, useState } from "react";
import "../../css/index.css";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducer";
import { chooseTicket } from "../../redux/actions";
import { setTicketType,chooseTicketType } from "../../redux/reducer";

const ChooseTicketModal = (props: any) => {
	const { open, close, id } = props;
	const customStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "50%",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
		},
	};
	const dispatch = useDispatch();
	const clickMin40 = () => {
		dispatch(chooseTicket(2));
		close();
	};
	const clickMin20 = () => {
		dispatch(chooseTicket(1));
		close();
	};
	const selectedTicket = useSelector(
		(state: RootState) => state.chooseTicketReducer,
	);
	const defaultTicket: setTicketType = {
		type: "",
		payload: {
			min20: 1,
			min20Left: 30,
			min40: 1,
			min40Left: 365,
		},
	};
	const defaultChoose: chooseTicketType = {
		type: "",
		payload: {
			selectedTicket: 1,
		},
	};
	const ticketState = useSelector((state: RootState) => state.setTicketReducer);
	const [ticketInfo, setTicketInfo] = useState<setTicketType>(defaultTicket);
	const [selectInfo, setSelectInfo] = useState<chooseTicketType>(defaultChoose);

	useEffect(() => {
		async function ticketStateFunc() {
			const tinfo: setTicketType = await ticketState;
			if (tinfo) {
				console.log(tinfo);
				setTicketInfo(tinfo);
			}
		}
		ticketStateFunc();
	}, [ticketState]);
	useEffect(() => {
		async function ticketSelectFunc() {
			const sinfo: chooseTicketType = await selectedTicket;
			if (sinfo) {
				setSelectInfo(sinfo.payload);
				console.log(sinfo);
			}
			
		}
		ticketSelectFunc();
	}, [ selectedTicket]);
	return (
		<div className=" relative">
			<Modal isOpen={open} style={customStyles} onRequestClose={close}>
				<div className=" overflow-hidden   ">
					<div className="rounded-[5px] bg-white flex mt-10  shadow-lg">
						<div className="w-full  ">
							<div>
								<div className="text-lg  -mt-5  font-bold ">수업권 선택</div>
								<div className="absolute top-[54px] right-[32px] z-10 flex h-[10px] w-[20px] items-center justify-center">
									<button onClick={close}>
										<img src="https://d38emex6h5e12i.cloudfront.net/new-theme/new-icons/adult/icon/x/black.svg" />
									</button>
								</div>
							</div>
							<div
								className="relative flex cursor-pointer mt-5 focus:outline-none z-10 rounded-lg py-8 border border-purple-500 bg-gray-100"
								onClick={() => {
									clickMin20();
								}}
							>
								<div className="ml-[3px] flex flex-1 flex-col  h-[30px]">
									<div className=" grid items-center ml-5 -mt-3 ">
										<div className=" bg-blue-50 text-blue-500 flex  w-[42px] items-center justify-center rounded-full">
											20분
										</div>

										<div className=" col-start-2 -ml-20">
											<div className="text-h4 mb-[3px]">1회 패키지(20분)</div>
											<div className="text-[12px] text-gray-500">
												수강 기간: {ticketInfo!.payload.min20Left}일 남음
											</div>
										</div>

										<div className="text-right col-start-3">
											<div className="text-[12px] text-gray-500">
												미사용 수업권
											</div>
											<div className="text-[18px] text-purple-500">
												{ticketInfo!.payload.min20}
											</div>
										</div>
									</div>
								</div>
								<div className="flex items-center justify-center px-[12px]">
									<span className="flex h-[18px] w-[18px] items-center justify-center rounded-full border-[1px] cursor-pointer border-[#7a5de8]">
										<div className="h-[12px] w-[12px] rounded-full bg-[#7a5de8]"></div>
									</span>
								</div>
							</div>

							<div
								className="relative flex cursor-pointer h-full  focus:outline-none py-8 rounded-lg border border-gray-200 hover:bg-gray-50 mt-5 "
								onClick={() => {
									clickMin40();
								}}
							>
								<div className="ml-[3px] flex flex-1 flex-col">
									<div className="grid items-center ml-5 -mt-3">
										<div className="bg-green-50 text-green-500 flex h-[42px] w-[42px] items-center justify-center rounded-full">
											<div>40분</div>
										</div>

										<div className="col-start-2 -ml-20">
											<div className="text-h4 mb-[3px]">1회 패키지</div>
											<div className="text-[12px] text-gray-500">
												수강 기간: {ticketInfo!.payload.min40Left}일 남음
											</div>
										</div>

										<div className="text-right col-start-3">
											<div className="text-[12px] text-gray-500">
												미사용 수업권
											</div>
											<div className="text-[18px] text-purple-500">
												{ticketInfo!.payload.min40}
											</div>
										</div>
									</div>
								</div>
								<div className="flex items-center justify-center px-[12px] -mt-[120px]">
									<span className="flex h-[18px] w-[18px] items-center justify-center rounded-full border-[1px] cursor-pointer border-[#7a5de8]">
										{/* <div className="h-[12px] w-[12px] rounded-full bg-[#7a5de8]"></div> */}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default ChooseTicketModal;
