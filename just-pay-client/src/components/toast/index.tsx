import { useToast } from "../../store/useToastStore";
import { X } from "lucide-react";
import ToastPortal from "./portal";

export default function Toast() {
    const { visible, message, type, hide, moreInfo } = useToast();

    if (!visible) return null;

    const backgroundColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';

    return (
        <ToastPortal show={visible}>
            <div className={`fixed top-4 right-4 ${backgroundColor} text-white px-4 py-2 rounded shadow-lg z-50 min-w-[300px]`}>
                <div className="w-full flex justify-between">
                    <p>{message}</p>
                    <button className="ml-4 underline hover:cursor-pointer" onClick={hide}>
                        <X className="inline-block w-4 h-4" />
                    </button>
                </div>
                {moreInfo && moreInfo.length > 0 && (
                    <div className="mt-2">
                        <ul className="list-disc list-inside">
                            {moreInfo.map((info, index) => (
                                <li key={index}>{info}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </ToastPortal>
    )
}