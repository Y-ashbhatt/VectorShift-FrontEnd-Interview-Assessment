import React from 'react';
import PropTypes from 'prop-types';

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
        const appData = { nodeType };
        event.target.style.cursor = 'grabbing';
        event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
        event.dataTransfer.effectAllowed = 'move';
    };

    const onDragEnd = (event) => {
        event.target.style.cursor = 'grab';
    };

    return (
        <div
            className={`border border-white rounded-lg p-3 cursor-grab transition duration-200 ease-in-out transform hover:scale-105 
                        hover:border-secondary bg-primary`}
            onDragStart={(event) => onDragStart(event, type)}
            onDragEnd={onDragEnd}
            role="button"
            aria-label={`Draggable node of type ${type} with label ${label}`}
            draggable
        >
            <span className="text-white">{label}</span>
        </div>
    );
};

DraggableNode.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};
