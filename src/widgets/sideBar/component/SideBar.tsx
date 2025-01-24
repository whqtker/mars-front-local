import React, { useState } from 'react';

import '../ui/SideBarStyle.css';

const Sidebar: React.FC = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="bg-dark col-auto col-md-1 min-vh-100 d-flex justify-content-between flex-column">
                    <div>
                        <a className="text-decoration-none text-white d-none d-sm-inline d-flex align-itemcenter">
                            <span className="ms-1 fs-4 d-none d-sm-inline">
                                Commars
                            </span>
                        </a>
                        <hr className="text-secondary d-none d-sm-block" />
                        <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
                            <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <a
                                    href="#"
                                    className="nav-link text-white fs-5"
                                    aria-current="page"
                                >
                                    <span className="ms-0 d-none d-sm-inline">
                                        검색
                                    </span>
                                </a>
                            </li>
                            <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <a
                                    href="#"
                                    className="nav-link text-white fs-5"
                                    aria-current="page"
                                >
                                    <span className="ms-0 d-none d-sm-inline">
                                        찜
                                    </span>
                                </a>
                            </li>
                            <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <a
                                    href="#"
                                    className="nav-link text-white fs-5"
                                    aria-current="page"
                                >
                                    <span className="ms-0 d-none d-sm-inline">
                                        길찾기
                                    </span>
                                </a>
                            </li>
                            <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <a
                                    href="#"
                                    className="nav-link text-white fs-5"
                                    aria-current="page"
                                >
                                    <span className="ms-0 d-none d-sm-inline">
                                        인기키워드
                                    </span>
                                </a>
                            </li>
                            <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <a
                                    href="#"
                                    className="nav-link text-white fs-5"
                                    aria-current="page"
                                >
                                    <span className="ms-1 d-none d-sm-inline">
                                        찜
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
