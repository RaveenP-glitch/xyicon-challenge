import { useState } from 'react'
import PortItem from './PortItem'
import './PortTemplate.css'

export interface PortNode {
  id: string
  value: string
  readOnly: boolean
  children: PortNode[]
}

const PortTemplate = () => {
  const [ports, setPorts] = useState<PortNode[]>([])
  const [nextId, setNextId] = useState(1)

  const handleAddRootPort = () => {
    const newPort: PortNode = {
      id: nextId.toString(),
      value: '',
      readOnly: false,
      children: []
    }
    setPorts([...ports, newPort])
    setNextId(nextId + 1)
  }

  const handleUpdatePort = (id: string, updates: Partial<PortNode>) => {
    const updateNodeRecursive = (nodes: PortNode[]): PortNode[] => {
      return nodes.map(node => {
        if (node.id === id) {
          return { ...node, ...updates }
        }
        if (node.children.length > 0) {
          return { ...node, children: updateNodeRecursive(node.children) }
        }
        return node
      })
    }
    setPorts(updateNodeRecursive(ports))
  }

  const handleAddChild = (parentId: string) => {
    const addChildRecursive = (nodes: PortNode[]): PortNode[] => {
      return nodes.map(node => {
        if (node.id === parentId) {
          const childNumber = node.children.length + 1
          const newChild: PortNode = {
            id: `${node.id}.${childNumber}`,
            value: '',
            readOnly: false,
            children: []
          }
          return { ...node, children: [...node.children, newChild] }
        }
        if (node.children.length > 0) {
          return { ...node, children: addChildRecursive(node.children) }
        }
        return node
      })
    }
    setPorts(addChildRecursive(ports))
  }

  const handleDeletePort = (id: string) => {
    const deleteNodeRecursive = (nodes: PortNode[]): PortNode[] => {
      return nodes
        .filter(node => node.id !== id)
        .map(node => ({
          ...node,
          children: deleteNodeRecursive(node.children)
        }))
    }
    setPorts(deleteNodeRecursive(ports))
  }

  const handleSave = () => {
    console.log('Saving ports:', ports)
    alert('Port configuration saved! Check console for details.')
  }

  const handleBack = () => {
    console.log('Going back')
    alert('Back button clicked')
  }

  return (
    <div className="port-template">
      <div className="port-template-header">
        <h1 className="port-template-title">Port Template</h1>
        <div className="header-buttons">
          <button className="back-button" onClick={handleBack}>
            Back
          </button>
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>

      <div className="port-template-content">
        <button className="add-root-button" onClick={handleAddRootPort}>
          +
        </button>

        <div className="ports-container">
          {ports.map((port, index) => (
            <PortItem
              key={port.id}
              node={port}
              label={String.fromCharCode(65 + index)} // A, B, C, D, E...
              onUpdate={handleUpdatePort}
              onAddChild={handleAddChild}
              onDelete={handleDeletePort}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PortTemplate

