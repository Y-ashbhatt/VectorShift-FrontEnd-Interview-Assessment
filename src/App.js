import React, { useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  const [nodes, setNodes] = useState([]); // State to hold nodes
  const [edges, setEdges] = useState([]); // State to hold edges

  // Function to handle the submission (can be customized)
  const handleSubmit = async () => {
    // Here you could perform any actions needed on submission
    console.log('Submitting:', { nodes, edges });
  };

  // Function to update nodes and edges, this can be defined based on your PipelineUI implementation
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
