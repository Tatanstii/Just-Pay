import { createPortal } from "react-dom";

type Props = {
    show: boolean;
    children?: React.ReactNode;
}

export default function ToastPortal({ show, children }: Props) {

    if (!show) return null;

    const anchor = document.getElementById('toast-root');
    if (!anchor) return null;


    return createPortal(children, anchor);
}