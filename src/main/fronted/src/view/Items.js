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



function Items() {



    const {id} = useParams();
    
    const [list , SetList] = useState([]);
   
    useEffect(() => {
        axios.get(`/api/v1/items/${id}`)
            .then(function(res){
                SetList(res.data);
               
            })
            .catch(function(error) {
                console.error("Error fetching item:", error);
            });
    }, [id]); // 빈 의존성 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

    console.log(list);

    return (
        <div>
        <div className="grid place-items-center bg-white py-24 sm:py-32 grid-cols-10 ">
            {list.length > 0 ? (
                <div className="mx-auto max-w-7xl px-6 lg:px-8 col-span-8" >
                    {/* 제목 */}
                    <div >
                        
                        <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"> [iOS/마케팅] {list[0].title}</h2>
                        <p className="mt-10 text-lg leading-8 text-gray-600">
                            <span >• 2일 전</span> 
                        
                            <span className="ml-3">•  조회수 2,000</span>
                            
                        </p>
                        </div>

                        {/* 모집상태 (ex: 완료, 진행중)*/}
                        <div className="mt-10">
                        <h4 className="text-3xl mb-10 font-bold tracking-tight text-gray-900 sm:text-2xl">모집 상태</h4>
                        <a
                            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                        >
                            모집중
                        </a>
                        </div >

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
                <div>Loading . . .</div>
            )}


            <div className="grid place-items-center col-span-2 ">
                <div class="tw-sticky tw-top-36">
                    <div className="relative mt-8 flex items-center gap-x-4">
                        <img alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                        <div className="text-sm leading-6">
                            <p className="font-semibold text-gray-900">
                                <a >
                                    <span className="absolute inset-0" />
                                    이름
                                </a>
                            </p>
                            <p className="text-gray-600">cto</p>
                        </div>
                    </div>
                </div>
                </div>
        </div>
        <ProjectCard></ProjectCard>
        </div>
    );
}

export default Items;