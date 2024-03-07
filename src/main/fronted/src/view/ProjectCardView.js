import { Link } from "react-router-dom";
import { Fragment, useEffect, useState, location } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";

// import styles bundle
import "swiper/css/bundle";


function ProjectCardView(){
     const [cardlists, setCardLists] = useState(['']);
     const [cardPage, setCardPage] = useState(0);
     const [loading, setLoading] = useState(true);
     
      
    useEffect(() => {

        axios.get(`/api/v1/viewProject`, {
            params: {
                page: cardPage,
                size: 10
            }
        }).then(function(res){
                setCardLists(res.data);
                setLoading(false);
                console.log("data 값 : " + res.data);
        }).catch(function(res){
            alert('테스트');
        })
    }, [cardPage]);


    useEffect(() => {
        const swiper = new Swiper('.swiper-card-view', {
            direction: 'horizontal',
            loop: true,
            slidesPerView: 2,
            spaceBetween: 20,
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-nextCard',
                prevEl: '.swiper-button-prevCard',
            },
            scrollbar: {
                el: '.swiper-scrollbar',
            },
        });
      }, [cardlists]);

    function move(){
        window.location.href="/projectall";
    }
    
    return (

        <div className="bg-white">
        {
            loading ? (
                <div>Loading...</div>
                ) : (
                    <>
                    <div className="mx-auto mt-10 max-w-8xl lg:mx-0 grid grid-cols-4">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl col-span-3 ">
                        인기 있는 프로젝트 TOP 10 🔥
                     
                    </h2>
                    <span className="text-2xl font-bold tracking-tight text-gray-900 sm:text-xl col-span-1" onClick={move}>  > &nbsp;&nbsp; 모두 보기 </span>
                    </div>
                    <div className="mt-3 font-bold ">인기있는 사이드 프로젝트를 확인해보세요!</div>
                    
                <div className="swiper-jd">
                <div className="swiper swiper-card-view">
                    <div className="swiper-wrapper mt-10">
                        {cardlists.map((cardList) => (
                            <div className="swiper-slide" key={cardList.id}>
                                <Link to={`/ProjectDetail/${cardList.id}`}>
                                    <article className="article-container flex max-w-xl flex-col items-start justify-between block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                        <div className="flex items-center gap-x-4 text-xs">
                                            <time dateTime={cardList.createdDate} className="text-gray-900">
                                                {cardList.createdDate} 전
                                            </time>
        
        
                                            {
                                                cardList.requiredPositions.map((test, index) => {
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
                                                {cardList.state} |   {cardList.title}
                                            </h3>
                                            <p className="mt-5 line-clamp-2 text-sm font-semibold leading-6 text-gray-600 ">{cardList.shortContent}</p>
                                            <p className="mt-5 text-sm leading-6 text-gray-600 text-xs ">조회수 {cardList.viewCount}  &nbsp;좋아요 {cardList.likeCount}</p>
                                            
                                        </div>
                                        <div className="relative mt-8 flex items-center gap-x-4">
                                            <img alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                                            <div className="text-sm leading-6">
                                                <p className="font-semibold text-gray-900">
                                                    <span className="absolute inset-0" />
                                                    {cardList.email}
                                                </p>
                                                <p className="text-gray-600">{cardList.position}</p>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            </div>
                        ))}
                    </div>
                 
                </div>
                <div className="swiper-button-prevCard"></div>
                <div className="swiper-button-nextCard"></div>
                </div>
                </>
                )
        }
      
        </div>
    );
}

export default ProjectCardView;
