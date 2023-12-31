interface Props {
  children?: React.ReactNode,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  disabled?: boolean
}

// Button in the style of neumorphism
// Bright shadow on one side, dark shadow on the other
export default function NeuButton({ children, onClick, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-bg shadow-[0_-3px_4px_rgba(255,255,255,0.07),0_3px_4px_rgba(0,0,0,0.4)]
                active:shadow-[inset_0_-3px_4px_rgba(255,255,255,0.07),inset_0_3px_4px_rgba(0,0,0,0.4)]"
    >
      {children}
    </button>
  );
}
