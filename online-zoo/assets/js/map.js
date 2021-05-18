const mapImage = document.getElementById('map');
const wrapper = document.getElementById('wrapper');
const headerElem = document.getElementById('header');
const footerElem = document.getElementById('footer');
const zoomInButton = document.getElementById('zoom-in');
const zoomOutButton = document.getElementById('zoom-out');
const ah = 90, aw=83;   
let animalHeight=ah, animalWidth=aw;

let topIndent = 0;
let leftIndent = 0;

const calculateCoords = (e, elem) => {
  var box = elem.getBoundingClientRect();
  topIndent = e.pageY - box.top + pageYOffset;
  leftIndent = e.pageX - box.left + pageXOffset;
}

const moveAt = (e) => {
  if (mapImage.style.position !== "absolute") {mapImage.style.position = "absolute";}
  mapImage.style.left = e.pageX - leftIndent + 'px';
  if (e.pageX >= wrapper.offsetWidth) {
    stopDrag();
  } else if (e.pageX <= 0) {
    stopDrag();
  }
  mapImage.style.top = e.pageY - (200 - pageYOffset) - topIndent + 'px';
}

const stopDrag = () => {
  document.removeEventListener('mousemove', moveAt);
  mapImage.removeEventListener('mouseup', stopDrag);
}

mapImage.addEventListener('mousedown', (e) => {

  if (mapImage.width <= wrapper.offsetWidth && mapImage.height <= wrapper.offsetHeight) {
    return;
  }

  calculateCoords(e, mapImage);
  moveAt(e);

  document.addEventListener('mousemove', moveAt);
  mapImage.addEventListener('mouseup', stopDrag);
});



mapImage.ondragstart = function() {
  return false;
};

headerElem.addEventListener('mouseenter', stopDrag);
footerElem.addEventListener('mouseenter', stopDrag);

zoomInButton.addEventListener('click', () => {
  // console.log(mapImage.offsetWidth+'  '+ wrapper.offsetWidth * 2);
  if (mapImage.offsetWidth <= wrapper.offsetWidth * 2) {
    if (mapImage.style.position !== "absolute") {mapImage.style.position = "absolute";}
    const prevWidth = mapImage.offsetWidth;
    const prevHeight = mapImage.offsetHeight;
    mapImage.style.width = `${mapImage.offsetWidth * 1.25}px`;
    mapImage.style.height =`${mapImage.offsetHeight * 1.25}px`;
    const nextWidth = mapImage.offsetWidth;
    const nextHeight = mapImage.offsetHeight;
    const topPos = mapImage.offsetTop || 0;
    const leftPos = mapImage.offsetLeft || 0;


    mapImage.style.left = `${leftPos - ((nextWidth - prevWidth) / 2)}px`;
    mapImage.style.top = `${topPos - ((nextHeight - prevHeight) / 2)}px`;

    animalHeight*=1.25;
    animalWidth*=1.25;
    document.documentElement.style.setProperty(`--aw`, `${animalWidth}px`);
    document.documentElement.style.setProperty(`--ah`, `${animalHeight}px`);
  }
});

zoomOutButton.addEventListener('click', () => {
  if (mapImage.offsetWidth >= wrapper.offsetWidth || mapImage.offsetHeight >= wrapper.offsetHeight) {
    if (mapImage.style.position !== "absolute") {mapImage.style.position = "absolute";}
    const prevWidth = mapImage.offsetWidth;
    const prevHeight = mapImage.offsetHeight;
    mapImage.style.width = `${mapImage.offsetWidth / 1.25}px`;
    mapImage.style.height = `${mapImage.offsetHeight / 1.25}px`;
    const nextWidth = mapImage.offsetWidth;
    const nextHeight = mapImage.offsetHeight;
    const topPos = mapImage.offsetTop || 0;
    const leftPos = mapImage.offsetLeft || 0;


    mapImage.style.left = `${leftPos + ((prevWidth - nextWidth) / 2)}px`;
    mapImage.style.top = `${topPos + ((prevHeight - nextHeight) / 2)}px`;

    if (mapImage.offsetWidth <= wrapper.offsetWidth && mapImage.offsetHeight <= wrapper.offsetHeight) {
      mapImage.style.width = "938.4px";
      mapImage.style.height = "584px";
      mapImage.style.top = `${(wrapper.offsetHeight - mapImage.offsetHeight) / 2}px`;
      mapImage.style.left = `${(wrapper.offsetWidth - mapImage.offsetWidth) / 2}px`;
    }

    animalHeight/=1.25;
    animalWidth/=1.25;
    document.documentElement.style.setProperty(`--aw`, `${animalWidth}px`);
    document.documentElement.style.setProperty(`--ah`, `${animalHeight}px`);
  }
});