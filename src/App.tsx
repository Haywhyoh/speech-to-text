import { AudioRecorder } from "react-audio-voice-recorder"
import CustomAudioRecorder from "./components/CustomAudioRecorder"
import { RecordingProvider } from "./context/RecordingContext"

function App() {
  return (
    <RecordingProvider>
      <main className="w-[400px] p-4 m-auto h-screen max-h-[-webkit-fill-available] flex flex-col justify-center">
        <CustomAudioRecorder />
      </main>
    </RecordingProvider>
  )
}

export default App
