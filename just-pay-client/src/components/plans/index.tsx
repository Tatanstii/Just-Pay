import { getPlans } from '@/services/plans'
import { useQuery } from '@tanstack/react-query'
import type { PlansResponse } from '@/type'
import PlanCard from '../plan-card'

type PropTypes = {
    currentPlanId?: number;
}

export default function Plans(props: PropTypes) {
    const { data, isPending, error } = useQuery<PlansResponse | Error>({
        queryKey: ['plans'],
        queryFn: () => getPlans()
    })

    const plans = data && !(data instanceof Error) ? data.data.data : []

    if (isPending) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>Error loading plans</h1>
    }

    return (
        <div className='flex flex-row gap-4'>
            {
                plans.map((plan) => (
                    <div key={plan.id} className='w-1/3'>
                        <PlanCard {...plan} currentPlanId={props.currentPlanId} />
                    </div>
                ))
            }
        </div>
    )
}
