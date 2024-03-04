import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import frontLogo from "../1f4d5.svg";
import { Viewer } from "@toast-ui/react-editor";
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import ProjectCard from "./ProjectCard";
import ProjectCardView from "./ProjectCardView";



function ProjectDetail() {


    const {id} = useParams();
    
    const [list , SetList] = useState(['']);
    
    const [loading, setLoading] = useState(true);

    const [like, setLike] = useState(true); // true 일때 좋아요 누를 수 있다.
   
    useEffect(() => {
        
        setLoading(true);
        
        /*
        * 1. 페이지 조회수 증가
        * 2. 조회
        * 3. 좋아요 개수 구하기
        */
        axios.get(`/api/v1/project/${id}`)
            .then(function(res){
                SetList(res.data);
                setLoading(false);
                console.log(res.data);
                
                axios.get(`/api/v1/project/like`, {
                    params : {
                        id : id,
                        
                    }
                })
                .then(function(res){
                    console.log("res.data 값 : " + res.data);
                    
                    //null값이면 저장되어 있는곳이 없으므로 setLike가 true가 되어야 한다
                   
                    if(res.data == null || res.data == ""){
                        setLike(true);
                    }else{
                        setLike(false);
                    }
                    console.log("성공");
                })
                .catch(function(res){
                    console.log("실패");
                });


            })
            .catch(function(error) {
                console.error("Error fetching item:", error);
                setLoading(true);
            });
        
    }, [id]); // 마운트 한 번 실행




    function Like(){
       
        axios.post(`/api/v1/project/like`, null, {
            params :{
                id: id
            },
        })
        .then(function(res){
            console.log("성공");
            setLike(false);
            let copy = [...list];
            copy[0].likeCount = list[0].likeCount + 1;

        })
        .catch(function(res){
            alert("실패");
        })
    }

    function LikeCancel(){
  
        axios.post(`/api/v1/project/likeCancel`, null, {
            params : {
                id : id,

            }
            
        })
        .then(function(res){
            console.log("성공");
            setLike(true);
            let copy = [...list];
            copy[0].likeCount = list[0].likeCount - 1;

        })
        .catch(function(res){
            console.log("실패");
        })
    }

    return (
        <div className="bg-white py-24 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid place-items-center bg-white py-24 sm:py-32 grid-cols-10 ">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 col-span-2"></div>
                {loading ? (
                    <div>Loading . . .</div>
                ) : (
                    list.length > 0 ? (
                        <div className="mx-auto max-w-7xl px-6 lg:px-8 col-span-4">
                            {/* 제목 */}
                            <div>
                                <div className="mx-auto max-w-2xl lg:mx-0">
                                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"> [{list[0].state}] {list[0].title}</h2>
                                    <p className="mt-10 text-lg leading-8 text-gray-600">
                                        <span>• {list[0].createdDate} 전</span>
                                        <span className="ml-3">• 조회수 {list[0].viewCount}</span>
                                        <span className="ml-3">• 좋아요 {list[0].likeCount}</span>
                                    </p>
                                </div>
                               
                                {/* 요약 */}
                                <div className="mt-10">
                                    <h4 className="text-3xl mb-10 font-bold tracking-tight text-gray-900 sm:text-2xl">요약</h4>
                                    <a
                                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                    >
                                        {list[0].shortContent}
                                    </a>
                                </div>

                                {/* 모집역할 (ex: 프론트엔드 백엔드 등등)*/}
                                <div className="mt-10">
                                    <h4 className="text-3xl mb-10 font-bold tracking-tight text-gray-900 sm:text-2xl">모집 역할</h4>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <img className="frontLogo" src={frontLogo} style={{ width: '30px', height: '30px' }}></img>
                                        <span
                                            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                        >
                                            프론트엔트
                                        </span>

                                        <img className="frontLogo ml-5" src={frontLogo} style={{ width: '30px', height: '30px' }}></img>
                                        <span
                                            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                        >
                                            백엔드
                                        </span>

                                        <img className="frontLogo ml-5" src={frontLogo} style={{ width: '30px', height: '30px' }}></img>
                                        <span
                                            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                        >
                                            디자인
                                        </span>
                                    </div>
                                </div>

                                {/* 내용 */}
                                <h4 className="text-3xl mt-10 mb-10 font-bold tracking-tight text-gray-900 sm:text-2xl">소개</h4>
                                <div className="mt-10">
                                    <Viewer
                                        width="100%"
                                        usageStatistics={false}
                                        initialValue={list[0].content}
                                        theme="dark"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mx-auto max-w-7xl px-6 lg:px-8 col-span-4">
                            <div>해당 값이 없습니다.</div>
                        </div>
                    )
                )}
                <div className="col-span-1"></div>
                
                <div className="grid place-items-center col-span-1">
                    <div className="tw-sticky tw-top-36">
                        <div className="relative mt-8 flex items-center gap-x-4">
                            <img alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                            <div className="text-sm leading-6">
                                <p className="font-semibold text-gray-900">
                                    <a >
                                        <span className="absolute inset-0" />
                                    </a>
                                </p>
                                <p className="text-gray-600">cto</p>
                            </div>
                        </div>
                    </div>
                    {
                        like ? ( <button onClick={() => Like()}>좋아요</button> ) : (<button onClick={() => LikeCancel()}>좋아요 완료</button>)
                    }
                    
                    {/* <button onClick={() => Like()}>좋아요</button> */}
                </div>
                <div className="grid place-items-center col-span-4"></div>
            </div>
            <ProjectCardView></ProjectCardView>
        </div>
    </div>
    
    );
}

export default ProjectDetail;