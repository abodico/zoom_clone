"use client"
import Loader from "@/components/Loader"
import MeetingRoom from "@/components/MeetingRoom"
import MeetingSetup from "@/components/MeetingSetup"
import { useGetCallById } from "@/hooks/useGetCallById"
import { useUser } from "@clerk/nextjs"
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk"
import React, { useState } from "react"
// here, we used `id` as the folder name is `id`
const Meeting = ({ params: { id } }: { params: { id: string } }) => {
    const { user, isLoaded } = useUser()
    const [isSetupComplete, setIsSetupComplete] = useState(false)
    const { call, isCallLoading } = useGetCallById(id)
    if (!isLoaded || isCallLoading) return <Loader />
    return (
        <main className="h-screen w-full">
            {/* we need to know which call we're currently in... */}
            {/* this task can be done with `call={}` attribute in the `StreamCall` component */}
            <StreamCall call={call}>
                <StreamTheme>
                    {/* now, we need to know if the audio & video setup has been completed or not */}
                    {!isSetupComplete ? (
                        <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
                    ) : (
                        <MeetingRoom />
                    )}
                </StreamTheme>
            </StreamCall>
        </main>
    )
}

export default Meeting
