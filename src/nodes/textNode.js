import { Handle, Position } from "reactflow";
import NodeBase from "../nodeBase";
import { useState, useEffect, useRef } from "react";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "Type Here...");
  const [variables, setVariables] = useState([]);
  const textAreaRef = useRef(null);

  // Regular expression to match variables inside {{ }}
  const variableRegex = /\{\{\s*(\w+)\s*\}\}/g;

  const handleTextChange = (e) => {
    const text = e.target.value;
    setCurrText(text);

    // Extract variables from the text
    const matches = [...text.matchAll(variableRegex)].map((match) => match[1]);
    setVariables(matches);
  };

  // Auto-resize function for the textarea
  const autoResize = () => {
    const textArea = textAreaRef.current;
    if (textArea) {
      // Reset the height and width so it can shrink/grow naturally
      textArea.style.height = "auto";
      textArea.style.width = "100%"; // Reset the width to full width

      // Adjust height and width based on scrollHeight/scrollWidth
      textArea.style.height = `${textArea.scrollHeight}px`;
      textArea.style.width = `${Math.min(textArea.scrollWidth, 500)}px`; // Constrain width to 500px max
    }
  };

  useEffect(() => {
    autoResize(); // Run once on mount to adjust to initial content
  }, []);

  useEffect(() => {
    autoResize(); // Run on text change
  }, [currText]);

  return (
    <NodeBase id={id} title="Text" data={data}>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Text:
          <br />
          <textarea
            ref={textAreaRef}
            value={currText}
            onChange={handleTextChange}
            onInput={autoResize} // Trigger resize on input
            className="resize-none overflow-hidden w-full min-h-[50px] max-h-[300px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            style={{
              height: "auto", // Dynamic height
              width: "", // Dynamic width
            }}
          />
        </label>
      </div>

      {/* Render a Handle for each variable detected */}
      {variables.map((variable, index) => (
        <div key={`${id}-${variable}-${index}`} >
          {/* Variable Label */}
          <div
            className="absolute text-right  text-0.7rem text-primary"
            style={{ top: `${index * 30}px`, right: '104%' }} // Align to the left side
          >
            {variable}
          </div>
          <Handle
            key={`${id}-${variable}-${index}`}
            type="target"
            position={Position.Left}
            id={`${id}-${variable}`}
            style={{ top: `${index * 30 + 20}px` }} // Adjust handle position dynamically
          />
        </div>
      ))}

      <Handle type="source" position={Position.Right} id={`${id}-output`} />
    </NodeBase>
  );
};
