# Port Template Component

A hierarchical port template management component built with React and TypeScript.

## Features

- **Hierarchical Structure**: Create nested port configurations with automatic ID management (1, 1.1, 1.1.1, etc.)
- **Dynamic Addition**: Add root-level ports and child ports at any level
- **Read-Only Toggle**: Toggle read-only mode for individual ports
- **Delete Functionality**: Remove ports at any level of the hierarchy
- **Letter Labels**: Root-level ports are labeled A, B, C, D, E, etc.
- **Clean UI**: Modern, responsive interface matching the provided design

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

### Build

```bash
npm run build
```

## Usage

1. Click the **+** button at the top to add a root-level port (labeled A, B, C, etc.)
2. Each port has:
   - An input field for entering data
   - A "Read only" toggle switch
   - A delete icon (trash can)
   - A **+** button to add child ports
3. Click the **+** button on any port to add a child port with hierarchical ID (e.g., 1.1, 1.1.1)
4. Use the **Save** button to save the configuration (currently logs to console)
5. Use the **Back** button to navigate back

## Component Structure

```
src/
├── components/
│   ├── PortTemplate.tsx    # Main component managing state and hierarchy
│   ├── PortTemplate.css    # Styling for main component
│   ├── PortItem.tsx        # Individual port item component
│   └── PortItem.css        # Styling for port items
├── App.tsx                 # Application entry component
├── App.css                 # Application styles
├── main.tsx               # React application entry point
└── index.css              # Global styles
```

## Technology Stack

- **React 18.2**
- **TypeScript 5.3**
- **Vite 5.0** (Build tool)
- **CSS3** (Styling)

## Data Structure

Each port node contains:
- `id`: Unique hierarchical identifier (e.g., "1", "1.1", "1.1.1")
- `value`: Input field value
- `readOnly`: Boolean flag for read-only mode
- `children`: Array of child port nodes

