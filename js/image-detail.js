const urlParams = new URLSearchParams(window.location.search);
const imageFileName = urlParams.get('img');

if (!imageFileName) {
  window.location.href = "index.html";
}

// Folder names corresponding to each image size with their dimensions
const folders = [
  { folder: '4k-desktop', name: '4K DESKTOP', dimensions: '3840×2160' },
  { folder: '750x1334', name: '750×1334', dimensions: '750×1334' },
  { folder: '1440x900', name: '1440×900', dimensions: '1440×900' },
  { folder: '1440x2560', name: '1440×2560', dimensions: '1440×2560' },
  { folder: '1600x900', name: '1600×900', dimensions: '1600×900' },
  { folder: '3440x1440', name: 'ULTRAWIDE', dimensions: '3440×1440' },
  { folder: 'full-hd', name: 'FULL HD', dimensions: '1920×1080' },
  { folder: 'laptop', name: 'LAPTOP', dimensions: '1366×768' },
  { folder: 'mobile-portrait', name: 'MOBILE', dimensions: '1080×1920' },
  { folder: 'qhd', name: 'QHD', dimensions: '2560×1440' },
  { folder: 'ultrawide', name: 'ULTRAWIDE+', dimensions: '3840×1600' }
];

// Set page title to image name
document.title = `${imageFileName.split('.')[0].replace(/-/g, ' ')} - Image Detail`;

// Display the image
const imgElement = document.getElementById('image');
if (imgElement) {
  imgElement.src = `images/header/${imageFileName}`;
  imgElement.alt = imageFileName.split('.')[0].replace(/-/g, ' ');
}

// Set the main header to the image name
const mainHeader = document.querySelector('h1');
if (mainHeader) {
  mainHeader.textContent = imageFileName.split('.')[0].replace(/-/g, ' ');
}

// Add back button
const backButton = document.createElement('a');
backButton.href = 'index.html';
backButton.classList.add('back-button');
backButton.textContent = '← Back to Gallery';
document.body.insertBefore(backButton, document.body.firstChild);

// Populate download buttons for each size
const buttonsContainer = document.querySelector('.buttons');
if (buttonsContainer) {
  // Create container for download buttons
  const downloadHeader = document.createElement('h2');
  downloadHeader.textContent = 'Download Options';
  buttonsContainer.appendChild(downloadHeader);

  const buttonGrid = document.createElement('div');
  buttonGrid.classList.add('button-grid');
  buttonsContainer.appendChild(buttonGrid);

  folders.forEach(item => {
    // Create a direct download link styled as a button 
    const downloadLink = document.createElement('a');
    downloadLink.href = `images/${item.folder}/${imageFileName}`;
    downloadLink.download = `${imageFileName.split('.')[0]}-${item.folder}.jpg`;
    downloadLink.textContent = item.name;
    downloadLink.classList.add('download-link');
    
    const button = document.createElement('div');
    button.classList.add('download-button');
    button.title = `Download in ${item.dimensions} resolution`;
    button.setAttribute('data-dimensions', item.dimensions);
    
    // Handle errors if the image doesn't exist in a particular format
    downloadLink.addEventListener('error', () => {
      button.classList.add('unavailable');
      button.title = `${item.name} version (${item.dimensions}) is not available`;
    });
    
    button.appendChild(downloadLink);
    buttonGrid.appendChild(button);
  });
}

// Size info tooltip
const buttonContainer = document.querySelector('.buttons');
if (buttonContainer) {
  const sizeInfo = document.createElement('p');
  sizeInfo.classList.add('size-info');
  sizeInfo.innerHTML = '<i>Hover over a button to see exact dimensions</i>';
  buttonContainer.insertBefore(sizeInfo, buttonContainer.querySelector('.button-grid'));
}