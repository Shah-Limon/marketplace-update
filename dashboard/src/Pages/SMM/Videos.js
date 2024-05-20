// import React, { useEffect, useState } from 'react';
import SidebarMenu from '../../components/Shared/SidebarMenu';
import Pagination from '../../components/Shared/Pagination';
import { useEffect, useState } from 'react';

const Videos = () => {
    const [templatesVideos, setTemplatesVideos] = useState([]);
    const [filteredVideos, setfilteredVideos] = useState([]);
    const [searchSubject, setSearchSubject] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);

    useEffect(() => {
        fetch(`https://raw.githubusercontent.com/Shah-Limon/em-list/master/videosLink.json`)
            .then((res) => res.json())
            .then((info) => {
                const shuffled = info.map(videos => ({
                    ...videos
                }));
                setTemplatesVideos(shuffled);
                setfilteredVideos(shuffled);
            });
    }, []);

    useEffect(() => {
        filterEmails();
    }, [searchSubject, currentPage, templatesVideos]);

    const filterEmails = () => {
        const filtered = templatesVideos.filter(e => {
            const subjectMatch = e.category.toLowerCase().includes(searchSubject.toLowerCase());

            return subjectMatch;
        });
        setfilteredVideos(filtered);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDownload = (videoUrl) => {
        const anchor = document.createElement('a');
        anchor.href = videoUrl;
        anchor.download = videoUrl.split('/').pop();
        anchor.click();
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentVideos = filteredVideos.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>
            <SidebarMenu />
            <div className="main-content">
                <div className="page-content">
                    <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary" id='new-dashboard'>
                        <div className="flex-grow-1 overflow-y-lg-auto">
                            <div className="container-fluid mt-5 mb-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-12">
                                        <div className="card">
                                            <div className="card-body p-0">
                                                <div className="table-filter-info">
                                                    <div className="d-flex flex-wrap justify-content-between">
                                                        <div className="form-group col-12">
                                                            <input
                                                                type="text"
                                                                className="form-control border"
                                                                placeholder="Search by Subject"
                                                                value={searchSubject}
                                                                onChange={(e) => setSearchSubject(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='container'>
                                <div className='mt-50 row'>
                                    {currentVideos.map((videos, index) =>
                                        <div className="col-lg-4 col-md-6 col-12 mb-15" key={index}>
                                            <div className="card text-center">
                                                <div className="card-body">
                                                    <p>
                                                        <video width={320} height={240} controls>
                                                            <source src={videos.link} type="video/mp4" />
                                                        </video>
                                                    </p>
                                                    <div className="d-flex justify-content-evenly">
                                                        <button className="btn btn-primary" onClick={() => handleDownload(videos.link)}>
                                                            Download Videos
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="pagination-container mb-50">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={Math.ceil(filteredVideos.length / itemsPerPage)}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Videos;
