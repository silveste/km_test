import "./sass/main.scss";

// SLIDER
//Get required information from DOM
const sliderWrapper = document.getElementById('slider__wrapper');
const sliderTrain = document.getElementById('slider__floating-row');
const items = sliderTrain.children;
const itemWidth = items[0].clientWidth; //Assume all items have same width
const numberOfItems = items.length;

//Set sliderTrain width
sliderTrain.style.width = itemWidth*numberOfItems + 'px';
//Center Slider sliderTrain (requires translateX(-50%)) in css
const centerSlider = () => sliderTrain.style.left = sliderWrapper.clientWidth/2 + 'px';
centerSlider();
//Add event listerner to center slider when resize the window
window.onresize = centerSlider;
