import { useContext } from "react"
import { RecordingContext } from "../context/RecordingContext"
import NeuButton from "./NeuButton"

export default function AudioRecorderButtons() {
  const { controls } = useContext(RecordingContext)

  return (
    <div className="flex justify-between">
      <div className="flex gap-5">
        <NeuButton>
          <div
            className={`h-[32px] w-[32px] rounded-full bg-buttonRed shadow-[0_0_12px_var(--buttonRed)]`}
          />
        </NeuButton>
        <NeuButton>
          <div className="flex gap-[0.35rem]">
            <div
              className={`h-[26px] w-[8px] rounded-sm bg-neutral shadow-[0_0_12px_rgba(255,255,255,0.4)]`}
            />
            <div
              className={`h-[26px] w-[8px] rounded-sm bg-neutral shadow-[0_0_12px_rgba(255,255,255,0.4)]`}
            />
          </div>
        </NeuButton>
      </div>
      <div className="flex gap-5">
        <NeuButton>
          <span className="text-xs font-semibold uppercase text-buttonRed drop-shadow-[0_0_12px_var(--buttonRed)]">
            Delete
          </span>
        </NeuButton>
        <NeuButton>
          <span className="text-xs font-semibold uppercase text-send drop-shadow-[0_0_12px_var(--send)]">
            Send
          </span>
        </NeuButton>
      </div>
    </div>
  );
}
