function Checkbox({ checked = false, onCheckedChange, disabled = false }) {
  const handleChange = () => {
    if (disabled) return;
    onCheckedChange?.(!checked);
  };

  return (
    <div className="relative">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="sr-only"
        disabled={disabled}
      />
      <div
        onClick={handleChange}
        className={`w-6 h-6 rounded-lg border-2 cursor-pointer transition-all duration-300 flex items-center justify-center ${
          checked 
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-500 shadow-lg' 
            : 'border-gray-300 hover:border-purple-400 hover:shadow-md'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {checked && (
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    </div>
  );
}

export { Checkbox };