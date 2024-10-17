import React, { useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  const [nodes, setNodes] = useState([]); // State to hold nodes
  const [edges, setEdges] = useState([]); // State to hold edges

  // Function to handle the submission 
  const handleSubmit = async () => {
    // perform actions needed on submission
    console.log('Submitting:', { nodes, edges });
  };

  // Function to update nodes and edges
  const updatePipelineData = (newNodes, newEdges) => {
    setNodes(newNodes);
    setEdges(newEdges);
  };

  return (
    <div>
      <PipelineToolbar />
      <PipelineUI updatePipelineData={updatePipelineData} /> {/* Pass function to update nodes and edges */}
      <SubmitButton onSubmit={handleSubmit} nodes={nodes} edges={edges} />
    </div>
  );
}

export default App;
