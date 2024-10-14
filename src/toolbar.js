import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div className="p-4 bg-primary shadow-md ">
            <h3 className="text-white text-2xl font-semibold mb-3 ml-1">Pipeline Toolbar</h3>
            <div className=" flex flex-wrap gap-4">
                <DraggableNode type="customInput" label="Input" />
                <DraggableNode type="llm" label="LLM" />
                <DraggableNode type="customOutput" label="Output" />
                <DraggableNode type="text" label="Text" />
                
                {/* New nodes */}
                <DraggableNode type="numberInput" label="Number Input" />
                <DraggableNode type="booleanInput" label="Boolean Input" />
                <DraggableNode type="dateInput" label="Date Input" />
                <DraggableNode type="imageOutput" label="Image Output" />
                <DraggableNode type="markdown" label="Markdown" />
            </div>
        </div>
    );
};
