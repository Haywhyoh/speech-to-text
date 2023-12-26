import { useContext, useEffect } from "react"
import AudioRecorderScreen from "./AudioRecorderScreen"
import { RecordingContext } from "../context/RecordingContext"

export default function CustomAudioRecorder() {
  const { controls } = useContext(RecordingContext)

  useEffect(() => {
    if(!controls) return

    console.log(controls.isRecording)
  }, [controls?.isRecording])

  return (
    <div>
      <AudioRecorderScreen />
    </div>
  )
}
