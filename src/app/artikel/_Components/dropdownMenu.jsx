"use client"
import { faReadme } from '@fortawesome/free-brands-svg-icons';
import { faBars, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, useRef } from 'react';

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="flex flex-row items-center border rounded-md ml-2 border-slate-500 px-2 h-full"
            >
                 <FontAwesomeIcon className="h-3 w-3" icon={faBars} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-600 text-slate-200 rounded-md shadow-lg ring-1 text-xs ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <a href="#2" className="block px-4 py-2 hover:bg-slate-500" role="menuitem"><FontAwesomeIcon icon={faUserCheck}/> Tentang Penulis</a><hr  className='border-slate-400' />
                        <a href="#3" className="block px-4 py-2 hover:bg-slate-500" role="menuitem"><FontAwesomeIcon icon={faReadme}/> Lihat Berita</a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
