import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Trash, Trash2 } from "lucide-react";

const AlertDialogBoxMultiple = ({
  onCancel,
  onConfirm,
  text,
  classname,
}: any) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className={cn("text-sm   w-full  flex ", classname)}>
        <button className="bg-red-600 text-white flex items-center rounded-full p-3 hover:bg-red-700 transition duration-300 shadow-md transform hover:scale-105">
          <Trash2 className="w-5 h-5" />
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete and
            remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="border border-input  bg-destructive text-white hover:border-blue-200 transition-colors hover:bg-slate-100 hover:text-accent-foreground"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogBoxMultiple;
