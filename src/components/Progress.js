const Progress = ({ percentage, size = 100, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2; // Calculate radius
  const circumference = 2 * Math.PI * radius; // Full circle length
  const offset = circumference - (percentage / 100) * circumference; // Progress offset

  return (
    <div className="progress">
    <svg width={50} height={50} viewBox={`0 0 ${size} ${size}`}>
      {/* Background Circle */}
      <circle className="circle1"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={percentage >= 70 ? "rgb(36, 78, 36)" : "rgb(114, 114, 31)"}
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Progress Circle */}
      <circle className="circle2"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={percentage >= 70 ? "green" : "yellow"}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference} // Total length
        strokeDashoffset={offset} // Offset to show progress
        strokeLinecap="round" // Rounded edges
        transform={`rotate(-90 ${size / 2} ${size / 2})`} // Rotate to start from top
      />

      {/* Percentage Text */}
      <text className="percent"
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="16"
        fill="white"
        fontWeight={600}
        fontFamily= "Roboto, sans-serif"
      >
        {percentage}%
      </text>
    </svg>
    </div>
  );
};

export default Progress;
