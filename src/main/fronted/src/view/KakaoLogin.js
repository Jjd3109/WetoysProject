import { useDeferredValue, useEffect, useState } from "react";
import axios from "axios";
import MemberJoin from "./MemberJoin";
import { useLocation } from "react-router-dom";

function KakaoLogin(){

    const location = useLocation();

    //URL의 search 부분을 파싱하여 쿼리 파라미터 추출
    const searchParams = new URLSearchParams(location.search);
    
    // 쿼리 파라미터 값 가져오기
    const accessToken = searchParams.get('accessToken');

    // 추출한 쿼리 파라미터 값 사용
    console.log('Access token:', accessToken);

    
    if(accessToken !== null && accessToken !== "null"){
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", "refreshToken");
        document.location.href = '/project';
    }


    axios.get("/kakao/login")
    .then(function(response){
        console.log("테스트");
    })
    .catch(function(response){
        console.log("테스트");
    })
    

    return (
        <div>

        </div>
    );

}

export default KakaoLogin;