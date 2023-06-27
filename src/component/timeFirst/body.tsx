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
	const windowSize = useRef([window.innerWidth, window.innerHeight]);
	const SlotCols = styled.div<{ width: number }>`
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
					<a
						className="appearance-none box-border focus:outline-none cursor-pointer"
				
					>
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

			<SlotCols
				className="min-w-[600px] overflow-hidden"
				width={windowSize.current[0] - 300}
			>
				2
			</SlotCols>
			<div className="min-w-[370px] fixed right-0 ">3</div>
		</div>
	);
};
