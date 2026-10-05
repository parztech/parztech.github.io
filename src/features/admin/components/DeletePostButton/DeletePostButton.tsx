"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { deletePost } from "@/features/admin/actions";
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
import { Button } from "@/components/ui/button";

import type { DeletePostButtonProps } from "./types";

export default function DeletePostButton({
  id,
  title,
  onDeleted,
}: DeletePostButtonProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Ջնջել"
            className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          />
        }
      >
        <Trash2 />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ջնջե՞լ հոդվածը</AlertDialogTitle>
          <AlertDialogDescription>
            «{title}» հոդվածը կջնջվի ընդմիշտ։ Այս գործողությունը հնարավոր չէ
            հետարկել։
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Չեղարկել</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={pending}
            onClick={() =>
              startTransition(async () => {
                try {
                  await deletePost(id);
                } catch (error) {
                  console.error(error);
                  toast.error("Չհաջողվեց ջնջել հոդվածը");
                  return;
                }
                toast.success("Հոդվածը ջնջված է");
                if (onDeleted) onDeleted();
                else router.refresh();
              })
            }
          >
            Ջնջել
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
