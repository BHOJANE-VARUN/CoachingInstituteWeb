import React, { useEffect, useState } from 'react';
import './Notices.css';
import {BASE_URL} from "./../../contants/Links"
const StudentNotices = () => {

    const [notices,setnotices] = useState(null);

    useEffect(()=>{
        const fetchdata = async ()=>{
            const raw = await fetch((BASE_URL+"/viewNotice"));
            const data = await raw.json();
            console.log(data);
            setnotices(data);
        }
        fetchdata();
    },[])
    if(notices==null)
    {
        return <div>Loading...</div>
    }
    return (
        <div className="notices-container">
            <h2 id='nothead'>Notices</h2>
            <div className="notices-list">
                {notices.map((notice) => (
                    <div key={notice.notice_id} className="notice-card w-fit">
                        <h3 className="notice-title">{notice.notice_name}</h3>
                        <p className='px-2 h-fit text-wrap w-fit'>{notice.notice_description}</p>
                        <div id='authdate'>
                        <p className="notice-author" name="author">By: {notice.author}</p>
                        <p className='notice-date w-28' name="date">{notice.notice_date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default StudentNotices;