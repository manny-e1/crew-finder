function MultiRangeSlider() {
  return (
    <div className="flex ">
      <input type="range" name="minmax" id="minmax" min="0" max="100" />
      <input type="range" name="minmaxx" id="minmaxx" min="0" max="100" />
    </div>
  );
}

export default MultiRangeSlider;
