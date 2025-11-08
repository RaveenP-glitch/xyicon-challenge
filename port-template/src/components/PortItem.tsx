import { PortNode } from './PortTemplate'
import './PortItem.css'

interface PortItemProps {
  node: PortNode
  label: string
  onUpdate: (id: string, updates: Partial<PortNode>) => void
  onAddChild: (parentId: string) => void
  onDelete: (id: string) => void
}

const PortItem = ({ node, label, onUpdate, onAddChild, onDelete }: PortItemProps) => {
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(node.id, { value: e.target.value })
  }

  const handleToggleReadOnly = () => {
    onUpdate(node.id, { readOnly: !node.readOnly })
  }

  const handleDelete = () => {
    onDelete(node.id)
  }

  const handleAddChild = () => {
    onAddChild(node.id)
  }

  return (
    <div className="port-item">
      <div className="port-item-row">
        <div className="port-label">{label}</div>
        <div className="port-input-container">
          <input
            type="text"
            className="port-input"
            value={node.value}
            onChange={handleValueChange}
            placeholder=""
            readOnly={node.readOnly}
          />
        </div>
        <div className="port-controls">
          <div className="read-only-toggle">
            <span className="toggle-label">Read only</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={node.readOnly}
                onChange={handleToggleReadOnly}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <button className="delete-button" onClick={handleDelete} title="Delete">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
            </svg>
          </button>
          <button className="add-child-button" onClick={handleAddChild} title="Add Child">
            +
          </button>
        </div>
      </div>

      {node.children.length > 0 && (
        <div className="port-children">
          {node.children.map((child) => (
            <PortItem
              key={child.id}
              node={child}
              label={child.id}
              onUpdate={onUpdate}
              onAddChild={onAddChild}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default PortItem

