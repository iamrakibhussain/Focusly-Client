import { X } from "lucide-react";
import { useEffect } from "react";
import TaskForm from "./TaskForm";

export default function TaskModal({ isOpen, onClose, onSuccess, initialData = {} }) {
  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
        
        <TaskForm 
          onTaskCreated={() => {
            if (onSuccess) onSuccess();
            onClose();
          }}
          onCancelEdit={onClose}
          initialData={initialData}
        />
      </div>
    </div>
  );
}
