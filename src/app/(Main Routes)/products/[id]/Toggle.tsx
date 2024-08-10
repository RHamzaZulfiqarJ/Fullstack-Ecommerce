"use client";

const SizeToggleButtonGroup = ({
  activeSize,
  setActiveSize,
}: {
  activeSize: string;
  setActiveSize: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleToggle = (size: any) => {
    setActiveSize(size === activeSize ? null : size);
  };

  return (
    <div className="flex space-x-2">
      {["XS", "S", "M", "L", "XL"].map((size) => (
        <button
          key={size}
          className={`font-semibold px-4 py-2 rounded ${
            activeSize === size ? "bg-gray-200 text-black shadow-md" : "bg-gray-100 text-black"
          }`}
          onClick={() => handleToggle(size)}>
          {size}
        </button>
      ))}
    </div>
  );
};

export default SizeToggleButtonGroup;
