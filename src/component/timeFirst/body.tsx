import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import BodyCols3 from "./bodyCols3";
import { addDays, addHours, format, setHours } from "date-fns";
import { ko, tr } from "date-fns/locale";
import { chooseClass } from "../../redux/actions";
import { RootState } from "../../redux/reducer";
import { DayPicker, DateFormatter, DateRange } from "react-day-picker";
import { selectTutorType } from "../../redux/reducer";
import humanImg from "../../assets/img/human.jpg";
import "react-day-picker/dist/style.css";
import "../../css/index.css";

const today = new Date();

export default () => {
	const [screenSize, setScreenSize] = useState(getCurrentDimension());
	const [showNotice, setShowNotice] = useState(true);
	//const [selectedRow, setSelectedRow] = useState(0);
	const [selectTutor, setSelectTutor] = useState<selectTutorType>();
	const [selectedSlotState, setSelectedSlotState] = useState("");
	const [hoveredSlotState, setHoverdSlotState] = useState("");
	const selectedTutor = useSelector(
		(state: RootState) => state.selectTutorReducer,
	);

	const dispatch = useDispatch();

	const defaultSelect: selectTutorType = {
		type: "",
		payload: {
			src: "",
		},
	};
	//튜터 선택 state 체크
	useEffect(() => {
		async function tutorSelectFunc() {
			const sinfo: selectTutorType = await selectedTutor;
			if (sinfo) {
				console.log(selectTutor);
				setSelectTutor(sinfo.payload);
			}
		}
		tutorSelectFunc();
	}, [selectedTutor]);

	function getCurrentDimension(): any {
		//화면 리사이징
		return {
			width: window.innerWidth,
			height: window.innerHeight,
		};
	}
	useEffect(() => {
		const updateDimension = () => {
			setScreenSize(getCurrentDimension());
		};
		window.addEventListener("resize", updateDimension);

		return () => {
			window.removeEventListener("resize", updateDimension);
		};
	}, [screenSize]);
	// 누른 튜터slot버튼 활성화
	useEffect(() => {
		const btn = document.getElementById(selectedSlotState);
		if (btn) {
			console.log(btn);
			btn!.style.visibility = "visible";
		}
	}, [selectedSlotState]);
	useEffect(() => {
		const btn = document.getElementById(hoveredSlotState);
		if (btn) {
			console.log(btn);
			btn!.style.visibility = "hidden";
		}
	}, [hoveredSlotState]);
	const formatCaption: DateFormatter = (month, options) => {
		//달력 헤더 커스텀
		return (
			<>
				<span>{today.getFullYear()}년 &nbsp;</span>

				{format(month, "LLLL", { locale: options?.locale })}
			</>
		);
	};
	//range State 기본값
	const defaultSelected: DateRange = {
		from: addDays(today, today.getDay() * -1),
		to: addDays(today, 6 - today.getDay()),
	};

	const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

	// 달력과 연동된 버튼 부분
	const onClickToday = () => {
		const today = new Date();
		setRange({
			from: addDays(today, today.getDay() * -1),
			to: addDays(today, 6 - today.getDay()),
		});
	};
	const onClickBefore = () => {
		if (addDays(range!.to!, -7) > today) {
			setRange({
				from: addDays(range!.from!, -7),
				to: addDays(range!.to!, -7),
			});
			if (addDays(range!.to!, -7).getMonth() < originMonth!.getMonth()) {
				const element: HTMLElement = document.querySelector(
					'[aria-label="Go to previous month"]',
				) as HTMLElement;
				if (element) {
					element.click();
				}
			}
		}
	};
	const onClickNext = () => {
		setRange({
			from: addDays(range!.from!, 7),
			to: addDays(range!.to!, 7),
		});
		if (addDays(range!.from!, 7).getMonth() > originMonth!.getMonth()) {
			const element: HTMLElement = document.querySelector(
				'[aria-label="Go to next month"]',
			) as HTMLElement;
			if (element) {
				element.click();
			}
		}
	};
	const onMonthChange = (props: Date) => {
		setOriginMonth(props);
	};
	const [originMonth, setOriginMonth] = useState<Date | undefined>(
		defaultSelected.to,
	);
	//달력에서 범위 누를시
	const onClickRange = (props: any) => {
		if (props.to == undefined) {
			setRange({
				from: addDays(props.from, props.from.getDay() * -1),
				to: props.from,
			});
		} else {
			if (range!.from! > props.from) {
				setRange({
					from: addDays(props.from, props.from.getDay() * -1),
					to: addDays(props.from, 6 - props.from.getDay()),
				});
			} else {
				setRange({
					from: addDays(props.to, props.to.getDay() * -1),
					to: addDays(props.to, 6 - props.to.getDay()),
				});
			}
		}
	};
	//달력 css
	const css = `
.my-selected:not([disabled]) { 
border: 2px solid purple;
border-width: 2px 0px 2px 0px ;
}
.my-selected:hover:not([disabled]) { 

}
.my-today { 
font-weight: bold;
color: balck;
}
`;
	const noticeClose = () => {
		setShowNotice(false);
	};

	const SlotCols = styled.div<{ width: number }>`
		width: ${(props) => props.width}px;
	`;
	const Notice = styled.div<{ width: number }>`
		width: ${(props) => props.width}px;
	`;
	const SlotColsSm = styled.div<{ width: number }>`
		width: ${(props) => props.width}px;
	`;
	//날짜 슬롯부분 함수
	function onHoverButton(props: any) {
		console.log(props);
		const btnArr = props.target.id.split("|");
		let btnId;
		if (btnArr[1] == undefined && props.target.id.includes("Hover")) {
			// 빠른 이동시 hover 추가 체크
			btnId = btnArr[0];
		} else {
			btnId = btnArr[0] + btnArr[1] + "Hover";
		}

		const btn = document.getElementById(btnId);

		if (btn) {
			btn!.style.visibility = "visible";
		}
	}
	function onLeaveButton(props: any) {
		const btnArr = props.target.id.split("|");
		let btnId;
		if (btnArr[1] == undefined && props.target.id.includes("Hover")) {
			// 빠른 이동시 hover 추가 체크
			btnId = btnArr[0];
		} else {
			btnId = btnArr[0] + btnArr[1] + "Hover";
		}

		const btn = document.getElementById(btnId);
		//console.log(btn);
		if (btn) {
			btn!.style.visibility = "hidden";
		}
	}

	const hours: string[] = [
		"자정0시",
		"새벽1시",
		"새벽2시",
		"새벽3시",
		"오전5시",
		"오전6시",
		"오전7시",
		"오전8시",
		"오전9시",
		"오전10시",
		"오전11시",
		"정오12시",
		"오후13시",
		"오후14시",
		"저녁19시",
		"저녁20시",
		"저녁21시",
		"저녁22시",
		"저녁23시",
	];
	//각시간대 컴포넌트 생성
	const hourList: JSX.Element[] = hours.map((hour, index) => {
		return (
			<div key={index} className="row  -mt-4  text-xs ">
				<div className="mt-0 slot-time">{hour}</div>

				{hour == "새벽3시" || hour == "오후14시" ? (
					<div className="flex">
						<div className=" reltive w-[0px] h-[20px] mt-2 pl-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
								role="img"
								width="18"
								height="18"
								preserveAspectRatio="xMidYMid meet"
								viewBox="0 0 24 24"
							>
								<path
									fill="currentColor"
									d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2z"
								></path>
							</svg>
						</div>
						<div className="row">
							<div className="relative w-[58px] h-[30px]">
								<div className=" -mt-0 absolute right-[1px] slot-border-nondashed"></div>
							</div>
							<div className="relative w-[58px] h-[30px]">
								<div className="-mt-0 absolute right-[1px] slot-border-dashed"></div>
							</div>
						</div>
					</div>
				) : (
					<div>
						<div className="relative w-[70px] h-[30px]">
							<div className=" -mt-0 absolute right-[1px] slot-border"></div>
						</div>
						<div className="relative w-[70px] h-[30px]">
							<div className="-mt-0 absolute right-[1px] slot-border-dashed"></div>
						</div>
					</div>
				)}
			</div>
		);
	});
	const hoursNumber: number[] = [
		0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 19, 20, 21, 22, 23,
	];
	//시간대 슬롯 컴포넌트 생성
	//range State기반으로 생성 현재시간과 비교하여 생성
	function hourNumberList(numSlot: number): JSX.Element[] {
		const arr: JSX.Element[] = [];
		arr.push(
			// top slot
			<SlotColsSm className="row" width={(screenSize.width - 700) / 8}>
				<div className="relative slot-border-half  h-[30px] bg-[#eff1f9]"></div>
			</SlotColsSm>,
		);
		for (let i = 0; i < hoursNumber.length; i++) {
			const gridDateO = addDays(range!.from!, numSlot);
			const gridDateHalf = addDays(range!.from!, numSlot);
			let futureDate = today;

			let oclock, half;
			oclock = true;
			half = true;

			gridDateO.setHours(hoursNumber[i]);
			gridDateO.setMinutes(0);
			gridDateHalf.setHours(hoursNumber[i]);
			gridDateHalf.setMinutes(30);

			futureDate = addDays(futureDate, 1);
			futureDate = addHours(futureDate, 2);

			if (futureDate > gridDateHalf) {
				half = false;
			}
			if (futureDate > gridDateO) {
				oclock = false;
			}

			if (hoursNumber[i] == 3 || hoursNumber[i] == 14) {
				arr.push(
					<SlotColsSm
						key={i}
						className="row"
						width={(screenSize.width - 700) / 8}
					>
						<div className="relative slot-border-on-rest  h-[30px] bg-[#eff1f9]"></div>
						<div className="relative  slot-border-half-rest h-[30px]  bg-[#eff1f9]"></div>
					</SlotColsSm>,
				);
			} else {
				arr.push(
					<SlotColsSm
						key={String(numSlot) + "|" + String(hoursNumber[i])}
						className="row  "
						width={(screenSize.width - 700) / 8}
					>
						{oclock ? (
							<div
								id={String(numSlot) + String(hoursNumber[i]) + "|on"}
								className="relative slot-border-on-work  h-[30px]"
								onMouseOver={(e: any) => {
									onHoverButton(e);
								}}
								onMouseLeave={(e: any) => {
									onLeaveButton(e);
								}}
							>
								<div
									className="btn-hide slot-hover bg-purple-200 rounded-md border"
									id={String(numSlot) + String(hoursNumber[i]) + "onHover"}
									onClick={(e: any) => {
										onClickSlot(e, false, i);
									}}
								>
									{hours[i]}
								</div>

								<div
									className="text-xs btn-hide flex border-purple-600 border p-1  shadow-md rounded-md -mt-5 "
									id={String(numSlot) + String(hoursNumber[i]) + "onChoice"}
								>
									<div className="w-[15px] rounded-full">
										<img
											alt="avatar-img"
											src={humanImg}
											className="avatar-img rounded-full"
										/>
									</div>
									{/* {selectTutor?.payload.src == "" ? (
										<div className="w-[15px] rounded-full">
											<img
												alt="avatar-img"
												src={humanImg}
												className="avatar-img rounded-full"
											/>
											<div>튜터선택</div>
										</div>
									) : (
										<div><img src={selectTutor?.payload.src}></img>선택완료</div>
									)} */}
									튜터선택
								</div>
							</div>
						) : (
							<div className="relative slot-border-on  h-[30px] bg-[#eff1f9]"></div>
						)}
						{half ? (
							<div
								id={String(numSlot) + String(hoursNumber[i]) + "|half"}
								className="relative slot-border-half  h-[30px]"
								onMouseOver={(e: any) => {
									onHoverButton(e);
								}}
								onMouseLeave={(e: any) => {
									onLeaveButton(e);
								}}
							>
								<div
									className="btn-hide slot-hover bg-purple-200 rounded-md border"
									id={String(numSlot) + String(hoursNumber[i]) + "halfHover"}
									onClick={(e: any) => {
										onClickSlot(e, true, i);
									}}
								>
									{hours[i] + "30분"}
								</div>
								<div
									className="text-xs btn-hide flex border-purple-600 border p-1  shadow-md rounded-md -mt-5"
									id={String(numSlot) + String(hoursNumber[i]) + "halfChoice"}
								>
									<div className="w-[15px] rounded-full">
										<img
											alt="avatar-img"
											src={humanImg}
											className="avatar-img rounded-full"
										/>
									</div>
									튜터선택
								</div>
							</div>
						) : (
							<div className="relative slot-border-half  h-[30px] bg-[#eff1f9]"></div>
						)}
					</SlotColsSm>,
				);
			}
		}
		return arr;
	}

	const date: string[] = ["일", "월", "화", "수", "목", "금", "토"];
	//요일 헤더 컴포넌트 생성
	const dateListHeader: JSX.Element[] = date.map((date, index) => {
		const indexPlusDate = addDays(range!.from!, index);
		return (
			<div key={index} className="  bg-white relative">
				<div key={index} className="row text-center text-sm ">
					{today.getDay() == index ? (
						<SlotColsSm
							className="topbar-slot-today"
							width={(screenSize.width - 700) / 7.8}
						>
							<div>{date}</div>
							<div className="slot-day-of-week-today">
								{indexPlusDate.getDate()}
							</div>
						</SlotColsSm>
					) : today.getDay() != index && (date == "일" || date == "토") ? (
						<SlotColsSm
							className="topbar-slot-holiday"
							width={(screenSize.width - 700) / 7.8}
						>
							<div>{date}</div>
							<div className="slot-day-of-week">{indexPlusDate.getDate()}</div>
						</SlotColsSm>
					) : (
						<SlotColsSm className="" width={(screenSize.width - 700) / 8}>
							<div>{date}</div>
							<div className="slot-day-of-week">{indexPlusDate.getDate()}</div>
						</SlotColsSm>
					)}
				</div>
			</div>
		);
	});
	function dateList(): JSX.Element[] {
		//요일별로 시간대 슬롯 생성 요청
		const arr: JSX.Element[] = [];

		for (let i = 0; i < 7; i++) {
			arr.push(
				<div
				// onClick={() => {
				// 	setSelectedRow(i);
				// }}
				>
					{hourNumberList(i)}
				</div>,
			);
		}
		return arr;
	}

	const onClickSlot = (props: any, isHalf: boolean, hour: number) => {
		//튜터선택 슬롯
		const btn = document.getElementById(selectedSlotState);
		if (btn) {
			btn!.style.visibility = "hidden"; //기존 선택버튼 숨기기
		}
		const btnHover = document.getElementById(props.target.id);
		if (btnHover) {
			setHoverdSlotState(props.target.id); //기존 hover버튼 숨기기
		}
		// 튜터선택 State disptch
		const selectedSlot = props.target.id;

		let selectedDay = range!.from!;

		selectedDay = addDays(selectedDay, selectedSlot[0]);

		selectedDay?.setHours(hour);
		if (isHalf) {
			selectedDay.setMinutes(30);
			let halfChoiceId = props.target.id.split("half");
			halfChoiceId = halfChoiceId[0] + "halfChoice";
			setSelectedSlotState(halfChoiceId);
		} else {
			selectedDay.setMinutes(0);
			let halfChoiceId = props.target.id.split("on");
			halfChoiceId = halfChoiceId[0] + "onChoice";
			setSelectedSlotState(halfChoiceId);
		}
		console.log(selectedDay);
		dispatch(chooseClass(selectedDay, props.target.innerText));
	};

	//body 전체 컴포넌트
	return (
		<div className="flex relative">
			{/* cols-1 */}
			<div>
				<div className="h-[150px]"> </div>
				<div className="min-w-[220px]">
					<style>{css}</style>
					<DayPicker
						className="DayPicker rdp  relative z-0"
						mode="range"
						selected={range}
						onSelect={onClickRange}
						disabled={{ before: today }}
						showOutsideDays
						onMonthChange={(props) => {
							onMonthChange(props);
						}}
						fromMonth={today}
						locale={ko}
						formatters={{ formatCaption }}
						modifiersClassNames={{
							selected: "my-selected",
							today: "my-today",
						}}
					/>
				</div>
				<div className="mb-[48px] pt-[16px] text-center absolute bottom-0 ml-12 ">
					<div className="mb-[12px] text-[12px] text-gray-300">
						신청 방식 변경
					</div>
					<a className="appearance-none box-border focus:outline-none cursor-pointer">
						<div className="inline-block font-normal text-center text-[14px] leading-snug box-border bg-white text-black border border-gray-300 hover:bg-gray-50 btn-sm rounded-md w-[150px] h-[40px] ">
							<div className="-mt-2 mr-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
									role="img"
									className="-mr-1 inline p-4 "
									width="3.2em"
									height="4em"
									preserveAspectRatio="xMidYMid meet"
									viewBox="0 0 24 24"
								>
									<g
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
									>
										<circle cx="12" cy="12" r="10"></circle>
										<path d="M12 6v6l4 2"></path>
									</g>
								</svg>
								튜터 먼저 선택
							</div>
						</div>
					</a>
				</div>
			</div>

			{/* cols-2 */}
			<SlotCols className="min-w-[600px] " width={screenSize.width - 700}>
				{showNotice && (
					<Notice
						width={screenSize.width - 700}
						className="relative mt-[16px] flex  items-center justify-center rounded-[5px] bg-purple-50 py-[12px] text-[14px] font-medium"
					>
						<img
							alt="icon-hint"
							src="https://d38emex6h5e12i.cloudfront.net/icon/icon-hint-primary.png"
							className="mr-[4px] h-[20px] w-[20px]"
						/>
						<span className="text-purple-500">Ringle’s Tip</span>
						<span className="ml-[8px]">
							3~4주 뒤 수업도 미리 예약해 보세요.
						</span>
						<img
							onClick={() => {
								noticeClose();
							}}
							alt="icon_x_gray"
							src="https://d38emex6h5e12i.cloudfront.net/new-theme/new-icons/adult/icon/x/gray.svg"
							className="absolute right-[16px] cursor-pointer"
						/>
					</Notice>
				)}
				<div className="flex h-[70px] items-center pl-[20px]">
					<button
						className="appearance-none box-border focus:outline-none cursor-pointer"
						onClick={() => {
							onClickToday();
						}}
					>
						<div className="inline-block font-normal text-center text-xs leading-snug box-border btn-sm bg-white chip-md text-purple-500 border border-purple-500 hover:bg-opacity-80 rounded-xl p-1 w-14">
							오늘
						</div>
					</button>
					<button
						className="appearance-none box-border focus:outline-none cursor-pointer"
						onClick={() => {
							onClickBefore();
						}}
					>
						<div className="flex items-center inline-block font-normal text-center text-h4 leading-snug box-border btn-sm bg-white chip-md text-purple-500 border border-purple-500 hover:bg-opacity-80 rounded-xl p-1 w-8 ml-3">
							<img
								className="ml-1"
								alt="icon_chevron_left_primary"
								src="https://d38emex6h5e12i.cloudfront.net/new-theme/new-icons/adult/icon/chevron-left/primary.svg"
							/>
						</div>
					</button>
					<button
						className="appearance-none box-border focus:outline-none cursor-pointer"
						onClick={() => {
							onClickNext();
						}}
					>
						<div className="flex items-center inline-block font-normal text-center text-h4 leading-snug box-border btn-sm bg-white chip-md text-purple-500 border border-purple-500 hover:bg-opacity-80 rounded-xl p-1 w-8 ml-3">
							<img
								className="ml-1"
								alt="icon_chevron_right_primary"
								src="https://d38emex6h5e12i.cloudfront.net/new-theme/new-icons/adult/icon/chevron-right/primary.svg"
							/>
						</div>
					</button>
					<div>
						<span className="border-l-1 display-8 mx-[19px] mb-7 mt-7 w-0 align-middle text-[12px]"></span>
						<span className="text-sBody text-[12px] text-black">
							Asia/Seoul
						</span>
						<a className="text-xs ml-[8px] cursor-pointer text-gray-500">
							타임존 변경
						</a>
					</div>
				</div>
				<div className="flex ml-16 h-[80px] relative">{dateListHeader}</div>
				<div className="flex toScroll -mt-6 pt-0  relative  ">
					<div className=" mt-3 text-[#80839e] h-[500px]">
						<div className="relative w-[70px] h-[30px]">
							<div className="absolute right-[1px] slot-border"></div>
						</div>
						{hourList}
					</div>
					<div className="mt-3 -ml-[1px] flex  h-[550px]">{dateList()}</div>
				</div>
			</SlotCols>
			<div className="min-w-[370px] fixed right-0 bg-white ">
				<BodyCols3></BodyCols3>
			</div>
		</div>
	);
};
