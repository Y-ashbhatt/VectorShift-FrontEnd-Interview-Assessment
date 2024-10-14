import { Handle, Position } from 'reactflow';
import NodeBase from '../nodeBase';

export const NumberInputNode = ({ id, data }) => {
    const handleTypeOptions = ['Integer', 'Float'];

    return (
        <NodeBase 
            id={id}
            title="Number Input"
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
