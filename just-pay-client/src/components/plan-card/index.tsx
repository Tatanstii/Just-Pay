import type { Plan } from "@/type";
import { formatCurrency } from '../../lib/utils';
import { Button } from "../ui/button";

type PropTypes = {
    currentPlanId?: number;
} & Plan;

export default function PlanCard(props: PropTypes) {
    const {
        name = "Plan",
        description = "",
        amount: price = 0,
        interval: billingCycle = "month",

    } = props as Partial<Plan>;

    return (
        <div className="border p-4 rounded-md w-full h-full flex flex-col justify-between">
            <h2 className="text-xl font-bold mb-2">{name}</h2>
            <div>
                <p className="text-gray-600 mb-4">{description}</p>
                <div className="text-2xl font-semibold mb-4">
                    {formatCurrency(price)}
                </div>
            </div>
            <div>
                <div className="text-gray-500">Billed {billingCycle}</div>
                {
                    props.currentPlanId === props.id ? (
                        <div className="mt-2 text-green-600 font-semibold">Current Plan</div>
                    ) : (
                        <Button className="mt-4 w-full">Select Plan</Button>
                    )
                }
            </div>
        </div>
    );
}
