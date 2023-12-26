import { createContext, useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { recorderControls } from "react-audio-voice-recorder/dist/hooks/useAudioRecorder";

interface RecordingContextType {
  controls?: recorderControls
}

export const RecordingContext = createContext<RecordingContextType>({
  controls: undefined,
})

export function RecordingProvider({ children } : { children: React.ReactNode }) {
  const c = useAudioRecorder()
  const [controls, setControls] = useState<recorderControls>(c)

  return (
    <RecordingContext.Provider value={{ controls }}>
      { children }
    </RecordingContext.Provider>
  )
}