// Sider/Input Range

const rangeInputs = document.querySelectorAll('input[type="range"]');

function updateSliderBackground(slider) {
  const value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.setProperty("--value", value);
  slider.style.background = `linear-gradient(
      to right,
      black ${value}%,
      hsl(240, 5%, 90%) ${value}%
    )`;
}

rangeInputs.forEach((input) => {
  updateSliderBackground(input);
  input.addEventListener("input", () => updateSliderBackground(input));
});
