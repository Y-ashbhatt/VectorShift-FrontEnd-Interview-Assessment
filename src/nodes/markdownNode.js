import { Handle, Position } from 'reactflow';
import NodeBase from '../nodeBase';
import { useState } from 'react';

export const MarkdownNode = ({ id, data }) => {
    const [markdown, setMarkdown] = useState(data?.markdown || '');

    const handleMarkdownChange = (e) => {
        setMarkdown(e.target.value);
    };

    return (
        <NodeBase 
            id={id}
            title="Markdown"
            data={data}
            handleTypeOptions={[]}
        >
            <textarea value={markdown} onChange={handleMarkdownChange} />
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-markdown`}
            />
        </NodeBase>
    );
};
