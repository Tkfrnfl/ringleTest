import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";

import { addDays, format } from "date-fns";
import { ko } from "date-fns/locale";
import {
	CaptionProps,
	DayPicker,
	useNavigation,
	DateFormatter,
	DateRange,
} from "react-day-picker";
import "react-day-picker/dist/style.css";
import "../../css/index.css";

const today = new Date();
const todayDefault = new Date();

const formatCaption: DateFormatter = (month, options) => {
	return (
		<>
			<span>{today.getFullYear()}년 &nbsp;</span>

			{format(month, "LLLL", { locale: options?.locale })}
		</>
	);
};

export default () => {
	const [screenSize, setScreenSize] = useState(getCurrentDimension());
	const [showNotice, setShowNotice] = useState(true);

	const noticeClose = () => {
		setShowNotice(false);
	};

	function getCurrentDimension(): any {
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

	const SlotCols = styled.div<{ width: number }>`
		width: ${(props) => props.width}px;
	`;
	const Notice = styled.div<{ width: number }>`
		width: ${(props) => props.width}px;
	`;

	const defaultSelected: DateRange = {
		from: addDays(today, today.getDay() * -1),
		to: addDays(today, 6 - today.getDay()),
	};
	const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
	const onClickRange = (props: any) => {
		console.log(props);
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

		console.log(range);
	};
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
	return (
		<div className="flex ">
			<div>
				<div className="h-[110px]"> </div>
				<div className="min-w-[250px]">
					<style>{css}</style>
					<DayPicker
						className="DayPicker"
						mode="range"
						selected={range}
						onSelect={onClickRange}
						disabled={{ before: today }}
						showOutsideDays
						fromMonth={today}
						locale={ko}
						formatters={{ formatCaption }}
						modifiersClassNames={{
							selected: "my-selected",
							today: "my-today",
						}}
						// modifiersStyles={{
						// 	disabled: { fontSize: "75%" },
						// }}
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
					>
						<div
							className="inline-block font-normal text-center text-h4 leading-snug box-border btn-sm bg-white chip-md text-purple-500 border border-purple-500 hover:bg-opacity-80"
							//style="padding-top: 3px; padding-bottom: 3px; font-size: 12px; margin-top: 0px; margin-right: 11px;"
						>
							오늘
						</div>
					</button>
					<button
						//data-ref="btn_previous"
						className="appearance-none box-border focus:outline-none cursor-pointer"
						//style="padding-left: 0px; padding-right: 0px;"
					>
						<div
							className="flex items-center inline-block font-normal text-center text-h4 leading-snug box-border btn-sm bg-white chip-md text-purple-500 border border-purple-500 hover:bg-opacity-80"
							//style="margin-right: 11px; height: 24px;"
						>
							<img
								alt="icon_chevron_left_primary"
								src="https://d38emex6h5e12i.cloudfront.net/new-theme/new-icons/adult/icon/chevron-left/primary.svg"
							/>
						</div>
					</button>
					<button
					//	data-ref="btn_next"
						className="appearance-none box-border focus:outline-none cursor-pointer"
					//	style="padding-left: 0px; padding-right: 0px;"
					>
						<div
							className="flex items-center inline-block font-normal text-center text-h4 leading-snug box-border btn-sm bg-white chip-md text-purple-500 border border-purple-500 hover:bg-opacity-80"
						//	style="height: 24px;"
						>
							<img
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
						<a className="text-h6 ml-[8px] cursor-pointer text-gray-500">
							타임존 변경
						</a>
					</div>
				</div>
			</SlotCols>
			<div className="min-w-[370px] fixed right-0 bg-white h-[300px]">3</div>
		</div>
	);
};
