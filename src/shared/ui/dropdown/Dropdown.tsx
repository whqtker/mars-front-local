import React, { useState, useEffect, useRef } from 'react';

// Types for the dropdown options
type DropdownOption = {
    label: string;
    icon?: React.ReactNode;
    action?: () => void; // Optional action when an option is selected
};

interface DropdownProps {
    options: DropdownOption[];
    buttonLabel?: string;
    buttonIcon?: React.ReactNode;
    onSelect?: (option: DropdownOption) => void; // Callback when an option is selected
}

const Dropdown: React.FC<DropdownProps> = ({
    options,
    buttonLabel = 'Menu',
    buttonIcon,
    onSelect,
}) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleOptionSelect = (option: DropdownOption) => {
        onSelect?.(option); // Trigger optional callback
        option.action?.(); // Trigger the option's specific action if provided
        setDropdownVisible(false); // Close the dropdown after selection
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            {/* Dropdown Button */}
            <button
                type="button"
                onClick={toggleDropdown}
                className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-black dark:text-white bg-white dark:bg-[#1E2028] border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-[#252731] focus:outline-none"
            >
                {buttonIcon && <span className="mr-2">{buttonIcon}</span>}
                {buttonLabel}
                <svg
                    className="w-5 h-5 ml-2 -mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-[#1E2028] ring-1 ring-black ring-opacity-5">
                    <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                    >
                        {options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionSelect(option)}
                                className="flex items-center w-full px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#252731] focus:outline-none"
                                role="menuitem"
                            >
                                {option.icon && (
                                    <span className="mr-3">{option.icon}</span>
                                )}
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
