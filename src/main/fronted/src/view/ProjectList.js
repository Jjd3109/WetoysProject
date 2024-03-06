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