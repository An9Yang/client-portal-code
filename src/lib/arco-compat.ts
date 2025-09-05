// Compatibility shim for Arco Design with React 19
// Arco Design uses the old ReactDOM.render API internally
// This shim provides a compatibility layer

import * as ReactDOMClient from 'react-dom/client';

declare global {
  interface Window {
    ReactDOM: any;
    CopyReactDOM: any;
  }
}

if (typeof window !== 'undefined') {
  const roots = new Map();
  
  const compatRender = (element: any, container: any, callback?: () => void) => {
    let root = roots.get(container);
    
    if (!root) {
      root = ReactDOMClient.createRoot(container);
      roots.set(container, root);
    }
    
    root.render(element);
    
    if (callback) {
      // Use a microtask to approximate the callback timing
      Promise.resolve().then(callback);
    }
    
    return element;
  };
  
  const unmountComponentAtNode = (container: any) => {
    const root = roots.get(container);
    if (root) {
      root.unmount();
      roots.delete(container);
      return true;
    }
    return false;
  };
  
  // Create ReactDOM object with compatibility methods
  const ReactDOM = {
    render: compatRender,
    unmountComponentAtNode: unmountComponentAtNode,
    createRoot: ReactDOMClient.createRoot,
    hydrateRoot: ReactDOMClient.hydrateRoot
  };
  
  // Assign to window before Arco loads
  window.ReactDOM = ReactDOM;
  window.CopyReactDOM = ReactDOM;
  
  // Also assign to any existing ReactDOM imports
  if ((window as any).React) {
    (window as any).ReactDOM = ReactDOM;
  }
}

export {};