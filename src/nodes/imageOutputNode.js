import { Handle, Position } from 'reactflow';
import NodeBase from '../nodeBase';

export const ImageOutputNode = ({ id, data }) => {
    return (
        <NodeBase 
            id={id}
            title="Image Output"
            data={data}
            handleTypeOptions={[]}
        >
            <img src={data?.imageSrc || 'https://via.placeholder.com/150'} alt="Output" style={{ maxWidth: '100%' }} />
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-image`}
            />
        </NodeBase>
    );
};
