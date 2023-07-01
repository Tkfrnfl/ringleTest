import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { RootState } from "../../redux/reducer";
import "../../css/index.css";
import mock from "../../assets/data/mock.json";

export default () => {
	const autoMatchRef = useRef<HTMLDivElement>(null);
	const tutorHoverRef = useRef<any>([]);
	const selectedSlotState = useSelector(
		(state: RootState) => state.chooseClassReducer,
	);
	const [selectedDate, setSelectedDate] = useState<Date>();
	const [selectedHour, setSelectedHour] = useState<string>();
	const [selectAutoMatch, setSelectAutoMatch] = useState(false);
	const [hoverAutoMatch, setHoverAutoMatch] = useState(false);
	const [selectTutor, setSelectTutor] = useState<boolean[]>([false]);
	useEffect(() => {
		async function selectedSlotInfo() {
			const selectedSlot: any = await selectedSlotState;
			if (selectedSlot) {
				console.log(selectedSlot.payload.payload.selectedSlot);
				setSelectedDate(selectedSlot.payload.payload.selectedSlot);
				setSelectedHour(selectedSlot.payload.payload.hourString);
			}
		}
		selectedSlotInfo();
	}, [selectedSlotState]);
	const selectTutorChange = (i:number) => {
		var selectedList=[...selectTutor]
		selectedList[i]=true
		setSelectTutor(selectedList)
	};
	const tutorData: JSX.Element[] = mock.data.map((item, index: number) => {
		return (
			<div
				className=" border-b py-[16px] pl-[20px] pr-[8px]"
				key={index}
				ref={(e) => {
					tutorHoverRef.current[index] = e;
				}}
			>
				<div
					className="row "
					onMouseOver={() => {
						//tutorHover()
						tutorHoverRef.current[index]!.style.backgroundColor = "#e4e7f4";
						tutorHoverRef.current[index]!.style.borderColor = "purple";
						tutorHoverRef.current[index]!.style.borderWidth = "1px";
					}}
					onMouseLeave={() => {
						tutorHoverRef.current[index]!.style.backgroundColor = "white";
						tutorHoverRef.current[index]!.style.borderColor = "#e4e7f4";
						tutorHoverRef.current[index]!.style.borderTopWidth = "0px";
						tutorHoverRef.current[index]!.style.borderLeftWidth = "0px";
						tutorHoverRef.current[index]!.style.borderRightWidth = "0px";
						tutorHoverRef.current[index]!.style.borderBottomWidth = "1px";
					}}
					onClick={()=>{
						selectTutorChange(index)
					}}
				>
					<div className="grid  ">
						<div className="w-[71px] cursor-pointer overflow-hidden rounded-full">
							<img
								alt="avatar-img"
								src={item.src}
								decoding="async"
								data-nimg="fixed"
								className="avatar-img rounded-full"
							/>
						</div>

						<div className="col-start-2    py-0 pl-[20px] pr-[8px] col-span-2 ">
							<div className="flex items-center justify-between">
								<span className=" text-lg m-0 pr-[8px] font-bold">
									{item.name}
								</span>
							</div>
							<div className="text-h5 school-truncate m-0 pr-[8px] font-medium text-gray-700">
								{item.univ}
							</div>
							<div className="text-sBody school-truncate mb-[8px] pr-[8px] text-[12px] text-gray-500">
								{item.major}
							</div>
						</div>
						<div className="col-start-3 ">
							{selectTutor[index]?(<img
								alt="icon_check_circle_incomplete"
								src="https://d38emex6h5e12i.cloudfront.net/new-theme/new-icons/adult/icon/check-circle/complete/primary.svg"
								className="mx-auto h-[24px] w-[24px] "
							/>):(<img
								alt="icon_check_circle_incomplete"
								src="https://d38emex6h5e12i.cloudfront.net/new-theme/new-icons/adult/icon/check-circle/incomplete.svg"
								className="mx-auto h-[24px] w-[24px] "
							/>)}
						</div>
					</div>
					<div>
						<div className="mb-[6px] text-[12px]">
							<span className="text-[14px] text-gray-500">
								수락률 <span className="text-black">{item.accpet}%</span>
							</span>
						</div>
						<div className="flex">
							<div className="text-xs p-1 rounded-md inline-block text-gray-700 bg-gray-100">
								<span className="capitalize text-gray-700">#{item.tag}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	});

	return (
		<div className="border">
			{!selectedDate ? (
				<div>
					<div className="h-[300px]"></div>
					<div className="row border text-muted m-[24px] items-center rounded-[4px] border-gray-200 p-[16px] py-[32px]  h-full items-center justify-center">
						<div className="flex">
							<i className="fa fa-arrow-left mt-3 mr-3"></i>

							<div className="col text-center">
								캘린더에서 원하시는 시간을 눌러
								<br />
								수업을 신청해 주세요.
							</div>
						</div>
					</div>
					<div className="h-[300px]"></div>
				</div>
			) : (
				<div>
					<div className="border-b flex min-h-[60px] items-center border-gray-200 px-[8px]">
						<div className="text-h4">
							{selectedDate.getMonth() + 1}월 {selectedDate.getDay()}일(수){" "}
							{selectedHour}
						</div>
					</div>
					<div
						className="relative block cursor-pointer px-[12px] py-[24px] border-b border-gray-200 bg-white"
						onClick={(e: any) => {
							autoMatchRef.current!.style.backgroundColor = "#e4e7f4";
							autoMatchRef.current!.style.borderColor = "purple";
							autoMatchRef.current!.style.borderWidth = "1px";
							setSelectAutoMatch(true);
						}}
						ref={autoMatchRef}
					>
						<div className="flex m-[0px]">
							<div className="col col-auto">
								<img
									src="https://d38emex6h5e12i.cloudfront.net/web/202210/ic-auto-matching.png"
									className="w-[72px]"
								/>
							</div>
							<div className="col ml-3">
								<div className="text-[20px] font-bold">링글 자동 매칭</div>
								<div className="text-[14px] text-gray-700">
									예약 가능한 튜터 중, 평점이 높고 성<br />
									실한 튜터와 자동으로 매칭해 드려요.
								</div>
							</div>
							<div className="col flex items-center col-auto ml-3 mt-3">
								{selectAutoMatch ? (
									<img src="https://d38emex6h5e12i.cloudfront.net/new-theme/new-icons/adult/icon/check-circle/complete/primary.svg"></img>
								) : (
									<img src="https://d38emex6h5e12i.cloudfront.net/new-theme/new-icons/adult/icon/check-circle/incomplete.svg" />
								)}
							</div>
						</div>
						<div className="row">
							<div className="mt-[14px] flex items-center">
								<div className="text-[14px] text-gray-700">
									불만족 시 수업권 복구
								</div>
								<img
									id="tooltip-refund"
									className="ml-[4px]"
									src="https://d38emex6h5e12i.cloudfront.net/new-theme/new-icons/adult/icon/question/black.svg"
									onMouseOver={() => setHoverAutoMatch(true)}
									onMouseLeave={() => setHoverAutoMatch(false)}
								/>
								{hoverAutoMatch && (
									<div className=" absolute bg-purple-500 text-sm mt-20 rounded-sm  text-white p-3">
										자동 매칭 튜터와의 수업 만족도가 낮을 경우, 수업권을
										복구해드립니다. (튜터 평가 3점 이하 및 사유 제출, 월 2회
										한정)
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="border-b p-3">튜터 직접 선택</div>
					<div className="border-b toScroll-tutor h-[600px] ">{tutorData}</div>
				</div>
			)}
		</div>
	);
};
