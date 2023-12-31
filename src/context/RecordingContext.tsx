import { SetStateAction, createContext, useEffect, useRef, useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { recorderControls } from "react-audio-voice-recorder/dist/hooks/useAudioRecorder";

interface RecordingContextType {
  controls?: recorderControls
  audioSrc?: string
  audioRef?: React.RefObject<HTMLAudioElement>
  audioIsPlaying?: boolean
  setAudioIsPlaying?: React.Dispatch<SetStateAction<boolean>>
}

export const RecordingContext = createContext<RecordingContextType>({
  controls: undefined,
  audioSrc: undefined,
  audioRef: undefined,
  audioIsPlaying: undefined,
  setAudioIsPlaying: undefined,
})

export function RecordingProvider({ children } : { children: React.ReactNode }) {
  const controls = useAudioRecorder()
  const [audioSrc, setAudioSrc] = useState<string | undefined>(undefined)
  const [audioIsPlaying, setAudioIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if(!controls.recordingBlob) return

    console.log('Saving recording...')

    // When the user stops recording, the recordingBlob variable is set
    // Here, we set the audio source to point to the blob (audio) that was just recorded
    setAudioSrc(URL.createObjectURL(controls.recordingBlob));
  }, [controls.recordingBlob])

  useEffect(() => {
    if(controls.isRecording) setAudioSrc(undefined)
  }, [controls.isRecording])

  return (
    <RecordingContext.Provider value={{ controls, audioSrc, audioRef, audioIsPlaying, setAudioIsPlaying }}>
      <>
        { audioSrc ? (
          <audio
            loop={true}
            ref={audioRef}
            src={audioSrc}
          />
        ) : undefined}
        { children }
      </>
    </RecordingContext.Provider>
  )
}