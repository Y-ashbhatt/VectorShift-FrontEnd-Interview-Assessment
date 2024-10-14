import { Handle, Position } from 'reactflow';
import NodeBase from '../nodeBase';

export const LLMNode = ({ id }) => {
    return (
        <NodeBase 
            id={id}
            title="LLM"
            data={{}} // no specific data for LLMNode
        >
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-system`}
                style={{ top: '33%' }}
            />
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-prompt`}
                style={{ top: '66%' }}
            />
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-response`}
            />
            <div>This is a LLM.</div>
        </NodeBase>
    );
};
