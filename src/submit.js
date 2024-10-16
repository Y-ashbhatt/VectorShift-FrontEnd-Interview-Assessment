import React, { useState } from 'react';
import Swal from 'sweetalert2';  // Import SweetAlert2

export const SubmitButton = ({ onSubmit, nodes, edges }) => {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        try {
            // Prepare the data to send
            const pipelineData = {
                nodes: nodes.map(node => ({ id: node.id })),  // Send only the node IDs
                edges: edges.map(edge => ({ source: edge.source, target: edge.target })),  // Send source and target
            };

            // Send a POST request to the backend
            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            // Display a prettier alert using SweetAlert2
            const dagStatus = result.is_dag ? 'Yes' : 'No';
            Swal.fire({
                title: 'Pipeline Summary',
                html: `
                    <ul style="text-align: left;">
                        <li><strong>Number of Nodes:</strong> ${result.num_nodes}</li>
                        <li><strong>Number of Edges:</strong> ${result.num_edges}</li>
                        <li><strong>Is Directed Acyclic Graph (DAG):</strong> ${dagStatus}</li>
                    </ul>
                `,
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'custom-swal-popup',
                },
            });

            // Optionally, call the onSubmit function passed as a prop
            await onSubmit();

        } catch (error) {
            console.error('Submission error:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to submit the pipeline. Please check the console for more details.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <button
                type="button"
                onClick={handleClick}
                className={`px-4 py-2 bg-[#420d8b] font-semibold text-white rounded-md border border-transparent focus:outline-none transition 
                            duration-300 ease-in-out transform hover:bg-[#fff] hover:text-primary hover:border-primary 
                            hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label="Submit form"
                disabled={loading}  // Disable button when loading
            >
                {loading ? 'Submitting...' : 'Submit'}
            </button>
        </div>
    );
};
