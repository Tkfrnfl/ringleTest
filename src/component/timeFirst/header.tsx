import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import logo from "../../assets/img/logo_purple.svg";
import ChooseTicketModal from "./chooseTicketModal";
import { RootState } from "../../redux/reducer";
import { chooseTicket } from "../../redux/actions";
import { setTicketType, chooseTicketType } from "../../redux/reducer";

export default () => {
	const windowSize = useRef([window.innerWidth, window.innerHeight]);
	const [modalOpen, setModalOpen] = useState(false);
	const Width = styled.div<{ width: number }>`
		width: ${(props) => props.width}px;
	`;

	const closeModal = () => {
		setModalOpen(false);
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
				console.log(tinfo.payload);
				setTicketInfo(tinfo.payload);
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
	}, [selectedTicket]);
	return (
		<div className="spaces-space-inner overflow-hidden border-gray-200 border">
			<ChooseTicketModal
				open={modalOpen}
				close={closeModal}
			></ChooseTicketModal>

			<div className="border-b-1 flex h-[71px] w-full items-center border-gray-200 bg-gray-50 pl-[24px]">
				<div className="row flex h-full w-full items-center">
					<div className="col col-auto text-xs  min-w-[70px]">
						<a className="cursor-pointer text-purple-500  flex items-center">
							<img src="https://d38emex6h5e12i.cloudfront.net/new-theme/new-icons/adult/icon/chevron-left/primary.svg" />
							<div className="ml-[12px]">나가기</div>
						</a>
					</div>
					<div className="col smd:hidden col-auto  ml-5  min-w-[30px]">
						<img src={logo} className="h-[30px] w-[30px]" />
					</div>

					<div className="col mdd:hidden text-gray-700 text-h4 font-bold col-auto text-base ml-5 min-w-[70px]">
						<a href="">수업 예약</a>
					</div>

					<div className="col text-gray-700 text-sBody mdd:hidden col-auto  text-sm ml-5 min-w-[180px]">
						STEP 1. 튜터 및 시간 선택
					</div>

					{selectInfo.payload.selectedTicket == 2 ? (
						<div
							className="col flex items-center lg:ml-18 col-auto ml-5 min-w-[360px]"
							onClick={() => {
								setModalOpen(true);
							}}
						>
							<a className="border-1 flex max-h-[40px] w-full cursor-pointer items-center justify-between rounded-md border-gray-300 bg-white px-[16px] py-[8px]">
								<div className="text-[14px] font-medium">
									<div className="mr-[12px] bg-blue-50 text-green-500 text-[12px] inline-block rounded-[4px] px-[8px] py-[0px] font-medium">
										40분
									</div>
									1회 패키지(40분)
									<span className="ml-[8px] text-gray-700">
										({ticketInfo.payload.min40}회 남음)
									</span>
								</div>
								<i className="fa fa-chevron-down ml-0 sm:ml-12"></i>
							</a>
						</div>
					) : (
						<div
							className="col flex items-center lg:ml-18 col-auto ml-5 min-w-[360px]"
							onClick={() => {
								setModalOpen(true);
							}}
						>
							<a className="border-1 flex max-h-[40px] w-full cursor-pointer items-center justify-between rounded-md border-gray-300 bg-white px-[16px] py-[8px]">
								<div className="text-[14px] font-medium">
									<div className="mr-[12px] bg-blue-50 text-blue-500 text-[12px] inline-block rounded-[4px] px-[8px] py-[0px] font-medium">
										20분
									</div>
									1회 패키지(20분)
									<span className="ml-[8px] text-gray-700">
										({ticketInfo.payload.min20}회 남음)
									</span>
								</div>
								<i className="fa fa-chevron-down ml-0 sm:ml-12"></i>
							</a>
						</div>
					)}

					<Width width={windowSize.current[0] - 1100} />
					<div className="col text-gray-700 lgd:hidden font-normal col-auto text-sm ml-12 min-w-[150px]">
						예약 신청한 수업
						<span className="ml-[8px] text-[14px] font-medium text-purple-500">
							1
						</span>
					</div>

					<div className="col col-auto mr-6">
						<button className="appearance-none box-border focus:outline-none cursor-pointer ml-6 bg-gray-200  min-w-[150px]  min-h-[42px] rounded">
							<div className="inline-block font-normal text-center text-h4 leading-snug box-border border border-gray-200 bg-gray-200 text-gray-300 hover:bg-gray-200 btn-md">
								다음
							</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
