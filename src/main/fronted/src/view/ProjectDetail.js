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



function ProjectDetail() {


    const {id} = useParams();
    
    const [list , SetList] = useState(['']);
    
    const [loading, setLoading] = useState(true);


   
    useEffect(() => {
        
        setLoading(true);
        
        /*
        * 1. 페이지 조회수 증가
        * 2. 조회
        */
        axios.get(`/api/v1/project/${id}`)
            .then(function(res){
                SetList(res.data);
                setLoading(false);
                console.log(res.data);
            })
            .catch(function(error) {
                console.error("Error fetching item:", error);
                setLoading(true);
            });

    
        
    }, [id]); // 마운트 한 번 실행



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
                                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"> [iOS/마케팅] {list[0].title}</h2>
                                    <p className="mt-10 text-lg leading-8 text-gray-600">
                                        <span>• {list[0].createdDate} 전</span>
                                        <span className="ml-3">• 조회수 {list[0].viewCount}</span>
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
                                        이름
                                    </a>
                                </p>
                                <p className="text-gray-600">cto</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid place-items-center col-span-4"></div>
            </div>
            <ProjectCard></ProjectCard>
        </div>
    </div>
    
    );
}

export default ProjectDetail;