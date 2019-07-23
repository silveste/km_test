import "./sass/main.scss";

// SLIDER
//Get required information from DOM
const slider = document.getElementById('slider-a');
const sliderWrapper = document.getElementById('slider__wrapper');
const sliderLooseRow = document.getElementById('slider__loose-row');
const items = sliderLooseRow.children;
const leftHandler = document.getElementById('slider__handler--left');
const rightHandler = document.getElementById('slider__handler--right');
//ItemWidth: Assume all items have same width, clientWidth property includes margins
const itemWidth = items[0].clientWidth;
const numberOfItems = items.length;

let selectedItem = {
  pos: Math.floor(numberOfItems/2),
  element: items[Math.floor(numberOfItems/2)]
}

/*
init:
Initialize the slider setting the (Number of items)/2 item at center
Add listener to handle window resizing
*/
const init = () => {

  //Set sliderLooseRow width and pos
  sliderLooseRow.style.width = itemWidth*numberOfItems + 'px';
  updateSlider();
  //Add event listerner to center slider when resize the window
  window.onresize = updateSlider;
  //Add the class selected to "itemAtCenter"
  selectedItem.element.classList.add('selected');

  //Add pointer listener the slider row
    slider.addEventListener('pointerdown', function(e){
      onPointerEventSlider(e);
    })
}

/*
Handling pointer events in the slider
There're differet behaviours depending where the user clicks:
  - User clicks in handlers: row advance one position to the left or to the righ
  - User clicks in row item: row move to center (as much as possible) the item
*/
const onPointerEventSlider = (e) => {
  let {pos, element} = selectedItem;
  element.classList.remove('selected');
  let newPos;

  //Get the item or handler clicked
  const itemClicked = e.composedPath().filter((val) => val.matches && val.matches('li.people, div.slider__handler'))[0];

  //Handling the 3 cases
  if (itemClicked.matches('div#slider__handler--left')){
    console.log('Former pos: ' + pos);
    newPos = pos - 1;
    console.log('Former pos: ' + newPos);
  } else if (itemClicked.matches('div#slider__handler--right')) {
    newPos = pos + 1;
  } else { // User clicked in one item, therefore iterates over all items
    for (let i = 0; i < items.length; i++){
      let item = items[i];
      if (itemClicked === item) {
        newPos = i;
        break;
      }
    }
  }

  items[newPos].classList.add('selected');
  selectedItem = {
    pos: newPos,
    element: items[newPos]
  }
  updateSlider();
};

/*
updateSlider:
Set the position of the slider loose row and activate/desactivate handlers (left or/and right)
*/
const updateSlider = () => {
  console.log('Loose row width: ' + itemWidth*numberOfItems);
  console.log('container width: ' + sliderWrapper.clientWidth);
  const looseRowWidth = sliderLooseRow.clientWidth;//itemWidth*numberOfItems;
  const wrapperWidth = sliderWrapper.clientWidth;

  //get looseRow left position
  const result = looseRowPos(looseRowWidth, wrapperWidth, itemWidth, selectedItem.pos);

  //Set CSS left property
  sliderLooseRow.style.left = result + 'px';

  //Check if left handler is needed and update it
  leftHandler.style.display = (result < 0) ? "flex" : "none";

  //Check if right handler is needed and update it
  rightHandler.style.display = (result + looseRowWidth > wrapperWidth) ? "flex" : "none";
}

/*
looseRowPos:
requires 4 integers: the looseRowWidth, the container width, position of a contained item that should be in the center (0 based) and the width of the items
Returns the position of the looseRow (to use with the CSS left property) that makes the item at given position centered when is posible.
The item won't be centered when:
  - The loose row width is smaller than the container
  - The space from the item to the left or right side of the loose row is smaller than the space of the container from the center to any side
*/
const looseRowPos = (looseRowWidth, containerWidth, itemWidth, itemAtCenter = 0) => {

  //If container is bigger than loose row the loose row will be centered
  if (containerWidth >= looseRowWidth) {
    return (containerWidth - looseRowWidth)/2;
  }

  const containerCenter = containerWidth/2;
  const distItemLeft = itemAtCenter*itemWidth + itemWidth/2;
  const distItemRight = looseRowWidth - distItemLeft;

  //If itemAtCenter is closer to the left than space available loose row position is 0
  if (distItemLeft <= containerCenter) {
    return 0;
  }

  //If itemAtCenter is closer to the right than space available loose row position is containerWidth - looseRowWidth
  if (distItemRight <=  containerCenter) {
    return containerWidth - looseRowWidth;
  }

  //Postion to make the itemAtcenter be at center
  return containerCenter - distItemLeft;
}

init();
