import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate  } from "react-router-dom";
// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";

// import styles bundle
import "swiper/css/bundle";

function ProjectAll(){
    const [lists, setLists] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      fetchProjects();
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [page]);
  
    const fetchProjects = (menuObject) => {
        
      setLoading(true);
      axios
        .get("/api/v1/project", {
          params: {
            page: page,
            size: 10,
            menuObject: menuObject
          },
        })
        .then((res) => {
          setLists((prevLists) => [...prevLists, ...res.data]);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching project data: ", error);
          setLoading(false);
        });
    };
  
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };
  
    const move = (id) => {
      navigate("/projectdetail/" + id);
    };


    const test = () => {
        alert('테스트');
    }

   

    return (
        
        <div className="bg-white py-24 sm:py-12 mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center gap-6 border-solid border-y border-t-0 border-x-0 border-slate-200 pb-4">
            <div className="flex-grow">
                <p className="font-bold text-xl text-slate-900 mb-4 mt-7"> 🎉 프로젝트 멤버를 구해보세요!</p>
                <p className="font-bold text-sm text-slate-900 mb-7">사이드 프로젝트 멤버를 찾거나 다양한 목적의 스터디/모임 모집글을 올릴 수 있어요!</p>
            </div>
            <hr className="mt-5"></hr>
        </div>
    
        <div className="grid grid-cols-4 gap-6 mx-auto max-w-7xl px-6 lg:px-8">
            
            {/* 왼쪽 카드*/}
            <div className="col-span-1 mt-10 " style={{ position: "sticky", top: "10px", height: "calc(100vh - 150px)", overflowY: "auto" }}>
                {/* 전체
                <p>프론트</p>
                <p>백</p>
                <p>디자인</p>
                <p>pm</p>
                <p>other</p> */}
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                Find Member
                </h5>
                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Connect one.</p>
                <ul className="my-4 space-y-3">
                <li>
                <a onClick={test} className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                <span className="flex-1 ms-3 whitespace-nowrap">All</span>
                <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Popular</span>
                </a>
                </li>
                <li>
                <a onClick={() => fetchProjects("Frontend")} className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                <span className="flex-1 ms-3 whitespace-nowrap">Frontend</span>
                </a>
                </li>
                <li>
                <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
               <span className="flex-1 ms-3 whitespace-nowrap">Backend</span>
                </a>
                </li>
                <li>
                <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
               <span className="flex-1 ms-3 whitespace-nowrap">Design</span>
                </a>
                </li>
                <li>
                <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                <span className="flex-1 ms-3 whitespace-nowrap">Pm</span>
                </a>
                </li>
                <li>
                <a href="/project" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                <span className="flex-1 ms-3 whitespace-nowrap">Other</span>
                </a>
                </li>
                </ul>
                <div>
                <a href="#" className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
                <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor"   d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                Why do I need to qustion ? </a>
                </div>
                </div>
            </div>
    
            {/* 가운데 카드*/}
            <div className="col-span-2 mt-10">
                {lists.map((list) => (
                    <article onClick={() => move(list.id)} className="article-container2 border-t-0 border-l-0 border-r-0 flex block max-w-xl flex-col items-start justify-between  p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <div className="flex items-center gap-x-4 text-xs">
                            <time dateTime={list.createdDate} className="text-gray-500">
                                {list.createdDate} 전
                            </time>
                            {list.requiredPositions.map((test, index) => (
                                <div key={index} className="relative z-10 rounded-full bg-gray-50 px-2 py-1.5 font-medium text-gray-900 hover:bg-gray-100">
                                    {test}
                                </div>
                            ))}
                        </div>
                        <div className="group relative">
                            <h3 className="mt-3 text-lg line-clamp-1 font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                <span className="absolute inset-0" />
                                {list.state} | {list.title}
                            </h3>
                            <p className="mt-5 line-clamp-3 font-semibold text-sm leading-6 text-gray-600">
                                {list.shortContent}
                            </p>
                            <p className="mt-5 text-sm leading-6 text-gray-600 text-xs">조회수 {list.viewCount} &nbsp;좋아요 {list.likeCount}</p>
                        </div>
                    </article>
                ))}
            </div>

            {/* 오른쪽 카드*/}
            {/* 프로젝트 인기순 1번부터 10번 까지 */}
            <div className="col-span-1 mt-10">
        

                <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Customers</h5>
                        <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                            View all
                        </a>
                </div>
                <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src="" alt="Neil image" />
                                    </div>
                                    <div className="flex-1 min-w-0 ms-4">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Neil Sims
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            email@windster.com
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        $320
                                    </div>
                                </div>
                            </li>
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center ">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src="" alt="Bonnie image" /> 
                                    </div>
                                    <div className="flex-1 min-w-0 ms-4">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Bonnie Green
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            email@windster.com
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        $3467
                                    </div>
                                </div>
                            </li>
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src="" alt="Michael image" /> 
                                    </div>
                                    <div className="flex-1 min-w-0 ms-4">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Michael Gough
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            email@windster.com
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        $67
                                    </div>
                                </div>
                            </li>
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center ">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src="" alt="Lana image" /> 
                                    </div>
                                    <div className="flex-1 min-w-0 ms-4">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Lana Byrd
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            email@windster.com
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        $367
                                    </div>
                                </div>
                            </li>
                            <li className="pt-3 pb-0 sm:pt-4">
                                <div className="flex items-center ">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src="" alt="Thomas image" /> 
                                    </div>
                                    <div className="flex-1 min-w-0 ms-4">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Thomes Lean
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            email@windster.com
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        $2367
                                    </div>
                                </div>
                            </li>
                        </ul>
                </div>
                </div>


            </div>
        </div>
    </div>
    
    );
}


export default ProjectAll