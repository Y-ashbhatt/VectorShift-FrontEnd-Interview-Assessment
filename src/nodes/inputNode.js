import { Handle, Position } from 'reactflow';
import NodeBase from '../nodeBase';

export const InputNode = ({ id, data }) => {
    const handleTypeOptions = ['Text', 'File'];

    return (
        <NodeBase 
            id={id}
            title="Input"
            data={data}
            handleTypeOptions={handleTypeOptions}
        >
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-value`}
            />
        </NodeBase>
    );
};
