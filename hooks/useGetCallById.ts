import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

// a hook is just a function starting with the word `use`
export const useGetCallById = (id: string | string[]) => {
    const [call, setCall] = useState<Call>()
    const [isCallLoading, setIsCallLoading] = useState(true)
    // next, we can get access to our stream video client
    const client = useStreamVideoClient()
    useEffect(() => {
        if (!client) return
        const loadCall = async () => {
            const { calls } = await client.queryCalls({
                filter_conditions: {
                    id,
                },
            })
            // if we fetch any calls...
            if (calls.length > 0) setCall(calls[0])
            setIsCallLoading(false)
        }
        loadCall()
    }, [client, id])
    return { call, isCallLoading }
}
