import { AudioRecorder } from "react-audio-voice-recorder"
import CustomAudioRecorder from "./components/CustomAudioRecorder"
import { RecordingProvider } from "./context/RecordingContext"

function App() {
  return (
    <RecordingProvider>
      <main>
        <CustomAudioRecorder />
      </main>
    </RecordingProvider>
  )
}

export default App
