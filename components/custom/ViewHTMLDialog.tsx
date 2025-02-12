import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Toaster } from "../ui/sonner";

export default function ViewHTMLDialog({
    openDialog,
    htmlCode,
    closeDialog,
}: any) {
    const copyCode = () => {
        navigator.clipboard.writeText(htmlCode);
        toast.success("Copy Successful");
    };

    return (
        <div>
            <Dialog open={openDialog} onOpenChange={closeDialog}>
                <DialogContent>
                    <DialogHeader className="flex flex-col gap-4">
                        <DialogTitle asChild>
                            <div className="flex gap-4 items-center justify-between">
                                <h2 className="text-lg font-bold">
                                    HTML Code is Here 😊
                                </h2>
                                <Button
                                    variant="outline"
                                    className="w-9 h-9 rounded-full border mr-3"
                                    onClick={copyCode}
                                >
                                    <Copy size={16} />
                                </Button>
                            </div>
                        </DialogTitle>
                        <DialogDescription asChild>
                            <ScrollArea className="border max-h-[400px] overflow-auto bg-zinc-950 text-white rounded-lg p-5">
                                <pre className="whitespace-pre-wrap break-all">
                                    <code>{htmlCode}</code>
                                </pre>
                            </ScrollArea>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Toaster closeButton richColors />
        </div>
    );
}
