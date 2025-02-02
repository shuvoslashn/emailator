import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";

export default function EmailTemplateList() {
    const [emailList, setEmailList] = useState([]);

    return (
        <div className="">
            <h2 className="font-semibold text-primary">Workspace</h2>
            {emailList?.length === 0 && (
                <div className="flex flex-col items-center">
                    <Image
                        src={"/mailbox.png"}
                        width={400}
                        height={400}
                        alt="mail box"
                        className="mt-0 lg:-mt-16"
                    />
                    <Button>Create New Template</Button>
                </div>
            )}
        </div>
    );
}
