import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SidebarMenu from '../../components/Shared/SidebarMenu';
import Pagination from '../../components/Shared/Pagination';

const Graphics = () => {
    const [templatesImage, setTemplateImage] = useState([]);
    const [filteredImages, setfilteredImages] = useState([]);
    const [searchSubject, setSearchSubject] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);

    useEffect(() => {
        fetch(`https://raw.githubusercontent.com/Shah-Limon/em-list/master/GraphicsTemplate.json`)
            .then((res) => res.json())
            .then((info) => {
                const shuffledEmails = info.map(email => ({
                    ...email
                }));
                setTemplateImage(shuffledEmails);
                setfilteredImages(shuffledEmails);
            });
    }, []);

    useEffect(() => {
        filterEmails();
    }, [searchSubject, currentPage]);

    const filterEmails = () => {
        const filtered = templatesImage.filter(e => {
            const subjectMatch = e.category.toLowerCase().includes(searchSubject.toLowerCase());

            return subjectMatch;
        });
        setfilteredImages(filtered);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const downloadImage = (imageUrl) => {
        // Fetch the image data
        fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                // Create a temporary anchor element
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'image.jpg';
                // Dispatching a click event on the anchor element
                link.dispatchEvent(new MouseEvent('click'));
            })
            .catch(error => {
                console.error('Error downloading image:', error);
                // Handle the error appropriately (e.g., display a message to the user)
                toast.error('Error downloading image');
            });
    };
    
    

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentImage = filteredImages.slice(indexOfFirstItem, indexOfLastItem);

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
                                    {currentImage.map((email, index) =>
                                        <div className="col-lg-4 col-md-6 col-12 mb-15" key={index}>
                                            <div className="card text-center">
                                                <div className="card-body">
                                                    <p>
                                                        <img
                                                            src={email.image}
                                                            className="img-fluid rounded-top"
                                                            alt=""
                                                        />
                                                    </p>
                                                    <div className="d-flex justify-content-evenly">
                                                        <button className="btn btn-primary" onClick={() => downloadImage(email.image)}>
                                                            Download
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
                                        totalPages={Math.ceil(filteredImages.length / itemsPerPage)}
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

export default Graphics;
