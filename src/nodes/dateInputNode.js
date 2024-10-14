import { Handle, Position } from 'reactflow';
import NodeBase from '../nodeBase';

export const DateInputNode = ({ id, data }) => {
    return (
        <NodeBase 
            id={id}
            title="Date Input"
            data={data}
            handleTypeOptions={[]}
        >
            <input type="date" value={data?.date || ''} onChange={(e) => console.log(e.target.value)} />
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-date`}
            />
        </NodeBase>
    );
};
