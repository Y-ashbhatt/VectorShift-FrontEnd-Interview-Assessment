import { Handle, Position } from "reactflow";
import NodeBase from "../nodeBase";

export const DateInputNode = ({ id, data }) => {
  return (
    <NodeBase id={id} title="Date Input" data={data} handleTypeOptions={[]}>
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#420d8b] placeholder-gray-400"
        type="date"
        value={data?.date || ""}
        onChange={(e) => console.log(e.target.value)}
      />
      <Handle type="source" position={Position.Right} id={`${id}-date`} />
    </NodeBase>
  );
};
