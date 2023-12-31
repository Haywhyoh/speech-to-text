import { useContext, useEffect } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { RecordingContext } from "../context/RecordingContext";

export default function AudioRecorderScreen() {
  const { controls } = useContext(RecordingContext);

  return (
    <div className="h-[125px] w-full flex flex-col rounded-xl border-8 border-screen-edge-top border-b-screen-edge-bottom bg-[radial-gradient(white,#939393_120%)] p-2 shadow-[0_24px_96px] shadow-[rgba(255,255,255,0.15)]">
      <span className="text-sm font-semibold uppercase">Top Text</span>
      <div className="flex-1 flex w-full justify-center items-center">
        <span className="text-center font-display text-5xl">0:35</span>
      </div>
      <span className="text-sm font-semibold uppercase">Bottom Text</span>
    </div>
  );
}
