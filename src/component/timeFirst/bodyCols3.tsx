import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { RootState } from "../../redux/reducer";
import "../../css/index.css";

export default () => {
    const selectedSlotState=useSelector((state:RootState)=>state.chooseClassReducer)
	const [selectedDate, setSelectedDate] = useState();
	useEffect(()=>{
		async function selectedSlotInfo(){
			var selectedSlot:any=await selectedSlotState
			if(selectedSlot){
				console.log(selectedSlot.payload.payload.selectedSlot)
				setSelectedDate(selectedSlot.payload.payload.selectedSlot)
				//console.log(selectedSlot!.payload.payload.selectedSlot)
			}
		}
		selectedSlotInfo()
		
	},[selectedSlotState])
	return (
		<div>
			<div className="h-[300px]"></div>
			<div className="row border-2 text-muted m-[24px] items-center rounded-[4px] border-gray-200 p-[16px] py-[32px]  h-full items-center justify-center">
				<div className="flex">
					<i className="fa fa-arrow-left mt-3 mr-3"></i>
					{String(selectedDate)}
					<div className="col text-center">
						캘린더에서 원하시는 시간을 눌러
						<br />
						수업을 신청해 주세요.
					</div>
				</div>
			</div>
            <div className="h-[300px]"></div>
		</div>
	);
};
