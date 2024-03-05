import { Link } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';
import ProjectCardView from './ProjectCardView';

// import styles bundle
import 'swiper/css/bundle';
import ProjectCard from './ProjectCard';



export default function ProjectList () {
    const [lists, setLists] = useState(['']);
    const [page, setPage] = useState(0);
    

    return (
        <div className="bg-white py-24 sm:py-32">
            
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">프로젝트</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    프로젝트의 팀원들을 구해 보세요 !
                </p>
            </div>
            <hr className='mt-10'></hr>
            <ProjectCardView></ProjectCardView>
            <hr ></hr>
            <ProjectCard></ProjectCard>
            <hr></hr>
        </div>
    </div>
    )
}