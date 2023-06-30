import React, { useEffect } from "react";
import axios from "axios";
import { RootState } from "../redux/reducer";
import Header from "./timeFirst/header";
import Body from "./timeFirst/body";

export default () => {
	return (
		<div>
			<Header></Header>
			<Body></Body>
		</div>
	);
};
