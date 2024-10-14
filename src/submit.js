import React, { useState } from 'react';

export const SubmitButton = ({ onSubmit }) => {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        try {
            await onSubmit(); // Call the onSubmit function passed as a prop
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <button
                type="button" // Change to 'button' to prevent default form submission
                onClick={handleClick}
                className={`px-4 py-2 bg-[#420d8b] font-semibold text-white rounded-md border border-transparent focus:outline-none transition 
                            duration-300 ease-in-out transform hover:bg-[#fff] hover:text-primary hover:border-primary 
                            hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label="Submit form"
                disabled={loading} // Disable button when loading
            >
                {loading ? 'Submitting...' : 'Submit'}
            </button>
        </div>
    );
};
