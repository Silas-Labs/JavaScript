const DatePicker = ({ handleSetDateSelect }) => {
  return (
    <input
      className="date-picker"
      type="date"
      onChange={(e) => handleSetDateSelect(e.target.value)}
    />
  );
};

export default DatePicker;
