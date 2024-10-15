import React, { useState } from 'react';

const NodeBase = ({ id, title, data, handleTypeOptions = [], children, customClassName = '', nodeWidth = 'w-64' }) => {
    const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
    const [inputType, setInputType] = useState(data.inputType || 'Text');

    const handleNameChange = (e) => {
        setCurrName(e.target.value);
    };

    const handleTypeChange = (e) => {
        setInputType(e.target.value);
    };

    return (
        <div className={`${nodeWidth} p-4 bg-white rounded-lg shadow-md border border-secondary transition-transform transform hover:scale-105 ${customClassName}`}>
            <div className="text-lg font-bold mb-2" style={{ color: '#420d8b' }}>{title}</div>
            <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Name:</label>
                <input 
                    type="text" 
                    value={currName} 
                    onChange={handleNameChange} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#420d8b] placeholder-gray-400"
                    placeholder="Enter name" 
                    aria-label="Node Name" 
                />
            </div>
            <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Type:</label>
                <select
                    value={inputType}
                    onChange={handleTypeChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#420d8b]"
                    aria-label="Input Type"
                >
                    {handleTypeOptions.length > 0 ? (
                        handleTypeOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))
                    ) : (
                        <option value="Text">Text</option> 
                    )}
                </select>
            </div>
            {children} {/* Dynamically injected node content */}
        </div>
    );
};

export default NodeBase;
