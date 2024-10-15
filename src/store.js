// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
} from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {}, // Add nodeIDs to track unique IDs per node type
    handles: {}, // Track handles for each node
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({ nodeIDs: newIDs });
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    onConnect: (connection) => {
        set({
            edges: addEdge({
                ...connection,
                type: 'smoothstep',
                animated: true,
                markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' },
            }, get().edges),
        });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
        set({
            nodes: get().nodes.map((node) => {
                if (node.id === nodeId) {
                    node.data = { ...node.data, [fieldName]: fieldValue };
                }
                return node;
            }),
        });

        // Check if updating the text field, and if variables ({{ varName }}) are detected
        if (fieldName === 'text') {
            const variableRegex = /\{\{\s*(\w+)\s*\}\}/g;
            const variables = [...fieldValue.matchAll(variableRegex)].map(match => match[1]);

            // Update handles based on variables found
            get().updateNodeHandles(nodeId, variables);
        }
    },
    updateNodeHandles: (nodeId, variables) => {
        const currentHandles = get().handles[nodeId] || [];
        const newHandles = variables.map((variable, index) => ({
            id: `${nodeId}-${variable}`,
            variable,
            position: { left: true }, // Handle will be on the left
            index
        }));

        set({
            handles: {
                ...get().handles,
                [nodeId]: newHandles
            }
        });
    },
}));
