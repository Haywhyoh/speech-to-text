import { useContext } from "react"
import { RecordingContext } from "../context/RecordingContext"
import NeuButton from "./NeuButton"
import { FaPlay } from "react-icons/fa"
import { getWaveBlob } from "webm-to-wav-converter"

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

  function encodeDataToBase64(buffer: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
  }

  const sendAudioToBackend = async () => {
  if (!controls || !controls.recordingBlob) return;

  const wav = await getWaveBlob(controls.recordingBlob, false);

  const reader = new FileReader();
  reader.readAsDataURL(wav); // Read the blob as a data URL (base64 encoded string)
  reader.onloadend = async () => {
    const base64EncodedData = reader.result; // This is your base64 encoded data

    // Ensure the result is a string and strip the data URL scheme part if present
    const base64String = typeof base64EncodedData === 'string' ? base64EncodedData.split(',')[1] : '';

    const res = await fetch(
      'https://iehehqhgx0.execute-api.eu-north-1.amazonaws.com/default/speech_to_text',
      {
        method: 'POST',
        body:  base64String, // Send as JSON payload
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, Origin',
          'Access-Control-Allow-Methods': 'OPTIONS, GET, POST', // Change to application/json
        },
      }
    );

    if (res.ok) {
      const text = await res.text();
      console.log(text);
    } else {
      const text = await res.text();
      console.log(text);
    }
  };
};
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
