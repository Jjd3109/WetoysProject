import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

    const [userEmail, setUserEmail] = useState();
   
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


    /*
     * 사용자 이메일 찾기
    */ 
    useEffect(() => {

        /*
         * 1. 이메일 반환 후 게시물 지은 이름이랑 동일하면 
        */ 

        axios.get(`/api/v1/project/findEmail`)
            .then(function(res){
                setUserEmail(res.data);
            })
            .catch(function(res){
                console.log("이메일 반환 실패");
            })

    })


    function Like(){
       
        axios.post(`/api/v1/project/like`, null, {
            params :{
                id: id
            },
        })
        .then(function(res){
            
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
           
            setLike(true);
            let copy = [...list];
            copy[0].likeCount = list[0].likeCount - 1;

        })
        .catch(function(res){
            console.log("실패");
        })
    }


    const navigate = useNavigate();
    
    const ModifyProject = () => {
      navigate("/ModifyProject/" + id);
    };


    return (
        <div className="bg-white py-24 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid place-items-center bg-white py-24 sm:py-32 grid-cols-10 ">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 col-span-1"></div>
                {loading ? (
                    <div>Loading . . .</div>
                ) : (
                    list.length > 0 ? (
                        <div className="mx-auto grid place-items-start max-w-7xl px-6 lg:px-8 col-span-6">
                            {/* 제목 */}
                            <div>
                                <div className="mx-auto max-w-2xl lg:mx-0">
                                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"> {list[0].state} |  {list[0].title}</h2>
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


                                        {list[0].requiredPositions.map((title, index) => {
                                                return (
                                                    <div className="flex items-center" key={index}>
                                                    <img className="frontLogo" src={frontLogo} style={{ width: '30px', height: '30px' }}></img>
                                                    <span
                                                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                                    >
                                                         {title}
                                                    </span>
                                                    </div>
                                                );
                                        })}

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
                {/* <div className="col-span-1"></div> */}
                
                <div className="grid place-items-center col-span-3">
                <div className="m-auto px-4 py-8 max-w-xl ">
                    {/* <div className="bg-white shadow-2xl " >
                        <div>
                            <img src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" />
                        </div>
                        <div className="px-4 py-2 mt-2 bg-white">
                            <h2 className="font-bold text-xs3 text-gray-800 text-center">Names</h2>
                                <p className=" text-gray-700 px-2 mr-1 my-3">
                                   self introduces
                                </p>
                            <div className="user flex items-center -ml-3 mt-8 mb-4">
                               
                                <div className="px-4 py-2 mt-2 text-gray-500">company / backend develop</div>
                            </div>
                        </div>
                    </div> */}


                    
                    <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
                        <img className="w-32 h-32 rounded-full mx-auto" src="https://picsum.photos/200" alt="Profile picture" />
                        <h2 className="text-center text-2xl font-semibold mt-3">John Doe</h2>
                        <p className="text-center text-gray-600 mt-1">Software Engineer</p>
                        <div className="flex justify-center mt-5">
                        <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">Twitter</a>
                        <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">LinkedIn</a>
                        <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">GitHub</a>
                        </div>
                        <div className="mt-5">
                        <h3 className="text-xl font-semibold">Bio</h3>
                        <p className="text-gray-600 mt-2">John is a software engineer with over 10 years of experience in developing web and mobile applications. He is skilled in JavaScript, React, and Node.js.</p>
                        </div>
                    </div>

                                        
                    {/* 좋아요를 눌렀으면 다음과 같이 안눌렀으면 나오지 않게*/}
                    {
                        like ?  ( 
                                    <button type="button" onClick={() => Like()} className="w-full py-2.5 mt-4 px-5 me-2 mb-2 text-sm font-bold text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">좋아요</button>
                                ) : 
                                (
                                    <button type="button" onClick={() => LikeCancel()} className="w-full py-2.5 mt-4 px-5 me-2 mb-2 text-sm font-bold text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">좋아요 완료</button>
                                )
                    }
                    
                    {/* 글을 쓴 사용자와 게시물의 작성자가 동일하면 수정 삭제 버튼 생성.*/}
                    {
                        userEmail == list[0].email &&  
                        <>
                        <button type="button" onClick={() => ModifyProject()} className="w-full py-2.5 mt-2 px-5 me-2 mb-2 text-sm font-bold text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">수정</button>
                        <button type="button" onClick={() => ModifyProject()} className="w-full py-2.5 mt-2 px-5 me-2 mb-2 text-sm font-bold text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">삭제</button>
                        </>   
                    }
                   
                </div>

                <div>
                </div>
                </div>
         
            </div>
            <ProjectCardView></ProjectCardView>
        </div>

    </div>
    
    );
}

export default ProjectDetail;