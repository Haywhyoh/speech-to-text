import { useContext, useEffect } from "react"
import AudioRecorderScreen from "./AudioRecorderScreen"
import { RecordingContext } from "../context/RecordingContext"
import AudioRecorderButtons from "./AudioRecorderButtons"

export default function CustomAudioRecorder() {
  const { controls, audioSrc } = useContext(RecordingContext)

  return (
    <div className="flex flex-col gap-6">
      <AudioRecorderScreen />
      <AudioRecorderButtons />
      { audioSrc ? (
        <audio
          src={audioSrc}
          controls={true}
        />
      ) : undefined}
    </div>
  )
}
