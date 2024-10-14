import { Handle, Position } from 'reactflow';
import NodeBase from '../nodeBase';

export const OutputNode = ({ id, data }) => {
    const handleTypeOptions = ['Text', 'Image'];

    return (
        <NodeBase 
            id={id}
            title="Output"
            data={data}
            handleTypeOptions={handleTypeOptions}
        >
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-value`}
            />
        </NodeBase>
    );
};
