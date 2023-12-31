import { useContext } from "react"
import { RecordingContext } from "../context/RecordingContext"
import NeuButton from "./NeuButton"

export default function AudioRecorderButtons() {
  const { controls, audioSrc } = useContext(RecordingContext)

  const pauseShape = (
    <>
      <div
        className="h-[26px] w-[8px] rounded-sm bg-neutral shadow-[0_0_12px_rgba(255,255,255,0.4)]"
      />
      <div
        className="h-[26px] w-[8px] rounded-sm bg-neutral shadow-[0_0_12px_rgba(255,255,255,0.4)]"
      />
    </>
  )

  const playShape = (
    <>
      <div 
        className="border-t-[15px] border-l-[22px] border-b-[15px] border-l-neutral border-t-[transparent] border-b-[transparent] translate-x-[2px]" 
      />
    </>
  )

  const sendAudioToBackend = () => {

  }

  return (
    <div className="flex justify-between">
      <div className="flex gap-5">
        {/* Record Button */}
        <NeuButton
          title="Toggle Recording"
          onClick={() => {
            if (!controls) return

            // toggle recording
            controls.isRecording
              ? controls.stopRecording()
              : controls.startRecording()
          }}
        >
          <div
            className={`h-[32px] w-[32px] rounded-full bg-buttonRed shadow-[0_0_12px_var(--buttonRed)]`}
          />
        </NeuButton>
        {/* Pause Recording/Playback Button */}
        <NeuButton
          title={
            controls &&
            (controls.isPaused
              ? 'Resume Recording'
              : controls.isRecording
              ? 'Pause Recording'
              : 'Toggle Playback')
          }
          disabled={controls && !controls.isRecording}
          onClick={() => {
            if (!controls) return

            if (controls.isRecording) controls.togglePauseResume()
          }}
        >
          <div className="flex gap-[0.35rem]">
            {controls?.isPaused ? playShape : pauseShape}
          </div>
        </NeuButton>
      </div>
      {/* Send recording to API button */}
      <NeuButton
        title="Send Audio to API"
        disabled={!audioSrc}
        onClick={() => sendAudioToBackend()}
      >
        <span className="text-xs font-semibold uppercase text-send drop-shadow-[0_0_12px_var(--send)]">
          Send
        </span>
      </NeuButton>
    </div>
  )
}
