import { createContext, useEffect, useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { recorderControls } from "react-audio-voice-recorder/dist/hooks/useAudioRecorder";

interface RecordingContextType {
  controls?: recorderControls
  audioSrc?: string
}

export const RecordingContext = createContext<RecordingContextType>({
  controls: undefined,
  audioSrc: undefined
})

export function RecordingProvider({ children } : { children: React.ReactNode }) {
  const controls = useAudioRecorder()
  const [audioSrc, setAudioSrc] = useState<string | undefined>(undefined)

  useEffect(() => {
    if(!controls.recordingBlob) return

    console.log('Saving recording...')

    // When the user stops recording, the recordingBlob variable is set
    // Here, we set the audio source to point to the blob (audio) that was just recorded
    setAudioSrc(URL.createObjectURL(controls.recordingBlob));
  }, [controls.recordingBlob])

  // useEffect(() => {
    
  // }, [controls.isRecording]);

  return (
    <RecordingContext.Provider value={{ controls, audioSrc }}>
      { children }
    </RecordingContext.Provider>
  )
}