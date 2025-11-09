import { formatCurrency } from "@/lib/utils"
import type { Plan } from "@/type"

export default function CurrentPlan(props: Plan) {
    return (
        <div className="border p-4 rounded-md shadow-md bg-primary/10">
            <h2 className="text-xl font-bold">{props.name}</h2>
            <p>{props.description}</p>
            <p className="font-semibold">{formatCurrency(props.amount)} {props.currency} / month</p>
        </div>
    )
}
