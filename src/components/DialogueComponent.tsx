import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "./ui/scroll-area";

const DialogueComponent = ({ open, content, setIsOpen }: any) => {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[900px] max-h-[90%] overflow-auto">{content}</DialogContent>
    </Dialog>
  );
};

export default DialogueComponent;
