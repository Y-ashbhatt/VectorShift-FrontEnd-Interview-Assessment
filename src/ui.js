import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

// Import node components
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { NumberInputNode } from './nodes/numberInput';
import { BooleanInputNode } from './nodes/booleanInputNode';
import { DateInputNode } from './nodes/dateInputNode';
import { MarkdownNode } from './nodes/markdownNode';
import { ImageOutputNode } from './nodes/imageOutputNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

// Define node types
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  numberInput: NumberInputNode,
  booleanInput: BooleanInputNode,
  dateInput: DateInputNode,
  imageOutput: ImageOutputNode,
  markdown: MarkdownNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  updateNodeHandles: state.updateNodeHandles, // Add handle update functionality from store
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    updateNodeHandles, // Ensure handle update is available
  } = useStore(selector, shallow);

  // Initialize node data
  const getInitNodeData = (nodeID, type) => ({ id: nodeID, nodeType: type });

  // Handle drop event
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const data = event.dataTransfer.getData('application/reactflow');

      if (!data) return; // No data to process

      const appData = JSON.parse(data);
      const type = appData?.nodeType;

      // Check if the dropped element is valid
      if (!type) {
        console.error('Invalid node type:', type);
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(type);
      const newNode = {
        id: nodeID,
        type,
        position,
        data: getInitNodeData(nodeID, type),
      };

      addNode(newNode);
    },
    [reactFlowInstance, addNode, getNodeID]
  );

  // Handle drag over event
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} className="w-full h-[70vh]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
      >
        <Background color="#aaa" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
