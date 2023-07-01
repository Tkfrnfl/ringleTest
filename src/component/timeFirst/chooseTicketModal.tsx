import React, { useEffect, useState } from "react";
import "../../css/index.css";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducer";

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
	return (
		<div className=" relative z-20 ">
			<Modal isOpen={open} style={customStyles}>
				<div className=" overflow-hidden ">
					<div className="rounded-[5px] bg-white flex   shadow-lg">

						<div className=" rounded mt-20 w-full ">
                        <div>
							<div className="text-lg   font-bold ">수업권 선택</div>
							<div className="absolute top-[34px] right-[32px] z-10 flex h-[20px] w-[20px] items-center justify-center">
								<button>
									<img src="https://d38emex6h5e12i.cloudfront.net/new-theme/new-icons/adult/icon/x/black.svg" />
								</button>
							</div>
						</div>
							<div className="relative flex cursor-pointer  focus:outline-none z-10 py-8 border-1 border-purple-500 bg-gray-100">
								<div className="ml-[3px] flex flex-1 flex-col ">
									<div className="row flex items-center ">
										<div className="bg-blue-50 text-blue-500 flex h-[42px] w-[42px] items-center justify-center rounded-full">
											20분
										</div>

										<div className=" ">
											<div className="text-h4 mb-[3px]">1회 패키지(20분)</div>
											<div className="text-[12px] text-gray-500">
												수강 기간: 30일 남음
											</div>
										</div>
										<div className="">
											<div className="text-right">
												<div className="text-[12px] text-gray-500">
													미사용 수업권
												</div>
												<div className="text-[18px] text-purple-500">1</div>
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

							<div className="relative flex cursor-pointer h-full  focus:outline-none py-8 border-1 border-gray-200 hover:bg-gray-50">
								<div className="ml-[3px] flex flex-1 flex-col">
									<div className="row flex items-center">
										<div className="bg-green-50 text-green-500 flex h-[42px] w-[42px] items-center justify-center rounded-full">
											<div>40분</div>
										</div>

										<div className="">
											<div className="text-h4 mb-[3px]">1회 패키지</div>
											<div className="text-[12px] text-gray-500">
												수강 기간: 365일 남음
											</div>
										</div>

										<div className="text-right">
											<div className="text-[12px] text-gray-500">
												미사용 수업권
											</div>
											<div className="text-[18px] text-purple-500">1</div>
										</div>
									</div>
								</div>
								<div className="flex items-center justify-center px-[12px]">
									<span className="flex h-[18px] w-[18px] items-center justify-center rounded-full border-[1px] cursor-pointer border-[#abbcd5]"></span>
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
