import { useContext, useEffect } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { RecordingContext } from "../context/RecordingContext";

export default function AudioRecorderScreen() {
  const { controls } = useContext(RecordingContext);

  return (
    <div>
      <p className="text-3xl">Test</p>
    </div>
  );
}
