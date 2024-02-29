import { Link } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';





const posts = [
    {
        id: 1,
        title: 'Boost your conversion rate',
        href: '/detail/1',
        description: 'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        category: { title: 'Marketing', href: '#' },
        author: {
            name: 'Michael Foster',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        }
    },
    {
        id: 2,
        title: '테스트입니다',
        href: '#',
        description: 'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        category: { title: 'Marketing', href: '#' },
        author: {
            name: 'Michael Foster',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        }
    },
    {
        id: 3,
        title: 'Boost your conversion rate',
        href: '#',
        description: 'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        category: { title: '사이드 프로젝트', href: '#' },
        author: {
            name: 'Michael Foster',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        }
    },
    {
        id: 4,
        title: 'Boost your conversion rate',
        href: '#',
        description: 'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        category: { title: 'Marketing', href: '#' },
        author: {
            name: 'Michael Foster',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        }
    },
    // More posts...
]

export default function ProjectList () {
    const [lists, setLists] = useState(['']);
    const [page, setPage] = useState(0);

    console.log("page 값 " + page);

    // Swiper
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'vertical',
        loop: true,
        
        spaceBetween: 30,
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
        },
      
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      
        // And if we need scrollbar
        scrollbar: {
          el: '.swiper-scrollbar',
        },
      });


    useEffect(() => {
        axios.get('api/v1/project', {
            params: {
                page: page,
                size: 10
            }
        }).then(function(res){
                setLists(res.data);
                console.log(res.data);
            })
    }, [page]);

    

    return (
        <div className="bg-white py-24 sm:py-32">
            
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">프로젝트</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    프로젝트의 팀원들을 구해 보세요 !
                </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {posts.map((post) => (
                    <Fragment key={post.id}>
                        <Link to={`/ProjectDetail/${post.id}`}>
                            <article className="flex max-w-xl flex-col items-start justify-between">
                                <div className="flex items-center gap-x-4 text-xs">
                                    <time dateTime={post.datetime} className="text-gray-500">
                                        {post.date}
                                    </time>
                                    <div className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                                        {post.category.title}
                                    </div>
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                        <span className="absolute inset-0" />
                                        {post.title}
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                                </div>
                                <div className="relative mt-8 flex items-center gap-x-4">
                                    <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                                    <div className="text-sm leading-6">
                                        <p className="font-semibold text-gray-900">
                                            <span className="absolute inset-0" />
                                            {post.author.name}
                                        </p>
                                        <p className="text-gray-600">{post.author.role}</p>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    </Fragment>
                ))}
            </div>
            
            <div className="mx-auto mt-10 max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">최신 프로젝트</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    프로젝트의 팀원들을 구해 보세요 !
                </p>
                { /* 버튼을 누르면 다음 컨텐츠를 보여주는 
                <button onClick={() => {setPage(page + 1)}}> 버튼을 누르면 다음 3개의 컨텐츠를 보여주는</button>
                */}
            </div>

            
            <div className="swiper">
                <div className="swiper-wrapper">
                    {lists.map((list) => (
                        <div className="swiper-slide" key={list.id}>
                            <Link to={`/ProjectDetail/${list.id}`}>
                                <article className="flex max-w-xl flex-col items-start justify-between">
                                    <div className="flex items-center gap-x-4 text-xs">
                                        <time dateTime={list.createdDate} className="text-gray-500">
                                            {list.createdDate}
                                        </time>
                                        <div className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                                            {list.projectCode}
                                        </div>
                                        <div className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                                            {list.state}
                                        </div>
                                    </div>
                                    <div className="group relative">
                                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                            <span className="absolute inset-0" />
                                            {list.title}
                                        </h3>
                                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{list.shortContent}</p>
                                    </div>
                                    <div className="relative mt-8 flex items-center gap-x-4">
                                        <img alt="" className="h-10 w-10 rounded-full bg-gray-50" />
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
                <div className="swiper-pagination"></div>
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
                <div className="swiper-scrollbar"></div>
            </div>
            
            {/* 
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                
                {lists.map((list) => (
                    <Fragment key={list.id}>
                        <Link to={`/ProjectDetail/${list.id}`}>
                            <article className="flex max-w-xl flex-col items-start justify-between">
                                <div className="flex items-center gap-x-4 text-xs">
                                    
                                    <time dateTime={list.createdDate} className="text-gray-500">
                                        {list.createdDate}
                                    </time>
                                    
                                    <div className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                                        {list.projectCode}
                                    </div>
                                    
                                    <div className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                                        {list.state}
                                    </div>
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                        <span className="absolute inset-0" />
                                        {list.title}
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{list.shortContent}</p>
                                </div>
                                
                                <div className="relative mt-8 flex items-center gap-x-4">
                                    <img alt="" className="h-10 w-10 rounded-full bg-gray-50" />
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
                    </Fragment>
                ))}
            </div>
            */}
        </div>
    </div>
    )
}