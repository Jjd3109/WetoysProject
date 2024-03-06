import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";

// import styles bundle
import "swiper/css/bundle";

/*
 * 새로운 프로젝트 
 */ 
function ProjectCard(){
    const [lists, setLists] = useState([]);
    const [page, setPage] = useState(0);
  
    useEffect(() => {
      axios
        .get("/api/v1/project", {
          params: {
            page: page,
            size: 10,
          },
        })
        .then((res) => {
          setLists(res.data);
          console.log("data 값 : " + res.data);
        })
        .catch((error) => {
          console.error("Error fetching project data: ", error);
        });
    }, [page]);
  
    useEffect(() => {
      const swiper = new Swiper(".swiper-card", {
        direction: "horizontal",
        loop: true,
        slidesPerView: 2,
        spaceBetween: 20,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }, [lists]);
  
    return (
      <div className="bg-white py-24 sm:py-12">
        <div className="mx-auto  max-w-2xl lg:mx-0">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            새로운 프로젝트 🎉
          </h2>
          <div className="mt-3 font-bold">새로 업데이트된 사이드 프로젝트를 확인해보세요!</div>
        </div>
        <div className="swiper-jd">
        <div className="swiper swiper-card">
          <div className="swiper-wrapper mt-10">
            {lists.map((list) => (
              <div className="swiper-slide" key={list.id}>
                <Link to={`/ProjectDetail/${list.id}`}>
                  <article className="article-container flex max-w-xl flex-col items-start justify-between block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div className="flex items-center gap-x-4 text-xs">
                      <time dateTime={list.createdDate} className="text-gray-500">
                        {list.createdDate} 전
                      </time>

                      {
                        list.requiredPositions.map((test, index) => {
                            return(
                                <div className="relative z-10 rounded-full bg-gray-50 px-2 py-1.5 font-medium text-gray-900 hover:bg-gray-100">
                                    {test}
                                </div>
                            )
                        })
                    }

                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-lg line-clamp-1 font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <span className="absolute inset-0" />
                        {list.state} | {list.title}
                      </h3>
                      <p className="mt-5 line-clamp-2 font-semibold text-sm leading-6 text-gray-600 ">
                        {list.shortContent}
                      </p>
                      <p className="mt-5 text-sm leading-6 text-gray-600 text-xs ">조회수 {list.viewCount}  &nbsp;좋아요 {list.likeCount}</p>
                                    
                    </div>
                    <div className="relative mt-8 flex items-center gap-x-4">
                      <img
                        alt=""
                        className="h-10 w-10 rounded-full bg-gray-50"
                      />
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                          <span className="absolute inset-0" />
                          {list.email}
                        </p>
                        <p className="text-gray-600">{list.position}</p>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
        </div>
      </div>
    );
  }
  
  export default ProjectCard;