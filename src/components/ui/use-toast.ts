
// Export the toast hooks from the shadcn toast component
import { type ToastActionElement, ToastProps, toast } from "@/components/ui/toast";
import { useToast as useToastOriginal } from "@/components/ui/toaster";

// Re-export with proper types
export const useToast = useToastOriginal;
export { toast, type ToastProps, type ToastActionElement };
