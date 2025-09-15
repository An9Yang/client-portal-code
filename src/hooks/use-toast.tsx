import * as React from "react"

interface ToastProps {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

interface ToastContextValue {
  toast: (props: ToastProps) => void
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined)

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    // Return a dummy function if context is not available
    return {
      toast: (props: ToastProps) => {
        console.log("Toast:", props)
      }
    }
  }
  return context
}

export function toast(props: ToastProps) {
  console.log("Toast:", props)
}

export { type ToastProps }