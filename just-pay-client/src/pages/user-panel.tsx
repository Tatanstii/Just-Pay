import Plans from "@/components/plans";
import { Suspense } from "react";

export default function UserPanelPage() {
    return (
        <main>
            <div className="px-10">
                <h1 className="my-4 text-2xl text-primary">Plans recommended for you</h1>
                <Suspense fallback={<h1>Loading plans...</h1>}>
                    <Plans />
                </Suspense>
            </div>
        </main>
    )
}
