import { useContext, useEffect, useRef, useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { RecordingContext } from "../context/RecordingContext";
import { FaPause, FaCircle, FaPlay } from 'react-icons/fa'
import { AudioVisualizer, LiveAudioVisualizer } from 'react-audio-visualize'

export default function AudioRecorderScreen() {
  const [recordingTime, setRecordingTime] = useState<number>(-1)
  const { controls, audioSrc, audioRef, audioIsPlaying } = useContext(RecordingContext)
  const visualizerRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if(!controls) return

    setRecordingTime(controls?.recordingTime)
  }, [controls?.recordingTime])

  const getTime = (n: number) => {
    return `${Math.floor(n / 60)}:${n % 60 < 10 ? '0' : ''}${n % 60}`
  }

  return (
    <div className="relative flex h-[125px] w-full flex-col justify-between rounded-xl border-8 border-screen-edge-top border-b-screen-edge-bottom bg-[radial-gradient(white,#939393_120%)] p-2 shadow-[0_24px_96px] shadow-[rgba(255,255,255,0.15)]">
      {controls ? (
        <>
          <span className="flex items-center gap-1 text-xs font-semibold uppercase">
            {controls.isRecording ? (
              controls.isPaused ? (
                // Recording, but paused
                <>
                  <FaPause />
                  <span>Paused</span>
                </>
              ) : (
                // Actively recording
                <>
                  <FaCircle className="text-[#e32626]" />
                  <span>Recording</span>
                </>
              )
            ) : audioSrc ? (
              audioIsPlaying ? (
                <>
                  <FaPlay />
                  <span>Playing</span>
                </>
              ) : (
                <>
                  <FaPause />
                  <span>Paused</span>
                </>
              )
            ) : (
              ''
            )}
          </span>
          <div className="absolute top-1/2 flex w-full flex-1 -translate-y-1/2 items-center justify-center">
            {audioSrc && controls.recordingBlob ? (
              <>
                <AudioVisualizer
                  ref={visualizerRef}
                  blob={controls.recordingBlob}
                  width={250}
                  height={60}
                  barColor={'black'}
                />
              </>
            ) : undefined}
            {controls.mediaRecorder && (
              <LiveAudioVisualizer
                mediaRecorder={controls.mediaRecorder}
                width={250}
                height={60}
                barColor="black"
              />
            )}
            {!audioSrc && !controls.isRecording ? (
              <h2 className="font-medium">
                Press <FaCircle className="inline h-[0.8em] text-[#e32626]" />{' '}
                to start recording.
              </h2>
            ) : undefined}
            <span className="text-center font-display text-5xl"></span>
          </div>
          <span className="text-xs font-semibold uppercase">
            {controls.isRecording ? getTime(recordingTime) : ''}
          </span>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
