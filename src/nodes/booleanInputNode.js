import { Handle, Position } from 'reactflow';
import NodeBase from '../nodeBase';

export const BooleanInputNode = ({ id, data }) => {
    const handleTypeOptions = ['True', 'False'];

    return (
        <NodeBase 
            id={id}
            title="Boolean Input"
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
