import { circularProgressTypes } from "../types/circularProgress";

const CircularProgress: React.FC<circularProgressTypes> = ({ status }) => {
  const isNumeric = (str: string): boolean => /\d/.test(str);
  const inprogress = isNumeric(status);
  const cancelled = ["Canceled", "-"].some((val) => val === status);
  const halfTime = status === "HT";
  const statusPercentage = inprogress ? parseInt(status) : halfTime ? 50 : 100;

  const backgroundStyle = {
    background: `conic-gradient(#22c55e ${
      (cancelled ? 0 : statusPercentage) * 3.6
    }deg, #737373 0deg)`,
  };

  return (
    <div
      data-testid="game-progress"
      className="relative w-16 h-16 md:w-24 md:h-24 rounded-full"
      style={backgroundStyle}
    >
      <div className="absolute inset-1 bg-stone-600 rounded-full flex items-center justify-center text-base md:text-4xl">
        {!cancelled && status}
      </div>
    </div>
  );
};

export default CircularProgress;
