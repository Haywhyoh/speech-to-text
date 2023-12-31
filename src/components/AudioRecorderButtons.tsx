import { useContext } from "react"
import { RecordingContext } from "../context/RecordingContext"
import NeuButton from "./NeuButton"
import { FaPlay } from "react-icons/fa"

export default function AudioRecorderButtons() {
  const { controls, audioSrc, audioRef, audioIsPlaying, setAudioIsPlaying } = useContext(RecordingContext)

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
      <FaPlay className="drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] h-[24px] w-[24px] translate-x-[2px] fill-neutral" />
    </>
  )

  const sendAudioToBackend = () => {
    fetch(
      'https://v14czaw0ed.execute-api.us-east-2.amazonaws.com/default/fiverr_efraimhoffman',
      {
        method: 'GET'
      }
    ).then(res => {
      console.log(res)
    })
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
          disabled={controls && !controls.isRecording && !audioSrc}
          onClick={() => {
            if (!controls) return

            if (controls.isRecording) controls.togglePauseResume()
            else if(audioRef && audioRef.current) {
              // Will never happen, but it stops TS errors because it can *technically* be undefined
              if(!setAudioIsPlaying) return

              if(audioIsPlaying) {
                setAudioIsPlaying(false)
                audioRef.current.pause()
              } else {
                setAudioIsPlaying(true)
                audioRef.current.play()
              }
            }
          }}
        >
          <div className="flex gap-[0.35rem]">
            {((controls?.isRecording && controls?.isPaused) || (!controls?.isRecording && !audioIsPlaying)) ? playShape : pauseShape}
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
