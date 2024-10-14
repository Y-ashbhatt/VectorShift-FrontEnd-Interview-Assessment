// textNode.js

import { Handle, Position } from 'reactflow';
import NodeBase from '../nodeBase';
import { useState } from 'react';

export const TextNode = ({ id, data }) => {
    const [currText, setCurrText] = useState(data?.text || '{{input}}');

    const handleTextChange = (e) => {
        setCurrText(e.target.value);
    };

    return (
        <NodeBase 
            id={id}
            title="Text"
            data={data}
        >
            <div>
                <label>
                    Text:
                    <input 
                        type="text" 
                        value={currText} 
                        onChange={handleTextChange} 
                    />
                </label>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
            />
        </NodeBase>
    );
};
