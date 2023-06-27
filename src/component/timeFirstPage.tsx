import React ,{useEffect}from 'react';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getApi } from '../redux/actions';
import { RootState } from '../redux/reducer';
import Header from './timeFirst/header';
import Body from'./timeFirst/body';

export default () => {
    const dispatch = useDispatch()

    // useEffect(()=>{
     
    // },[]);


    return(
        <div>
          <Header></Header>
          <Body></Body>
      </div>
    )
}
