const urlParams = new URLSearchParams(window.location.search);
const imageFileName = urlParams.get('img');

if (!imageFileName) {
  window.location.href = "index.html";
}

// Folder names corresponding to each image size
const folders = [
  '4k-desktop', 
  '750x1334', 
  '1440x900', 
  '1440x2560', 
  '1600x900', 
  '3440x1440',
  'full-hd', 
  'laptop', 
  'mobile-portrait', 
  'qhd', 
  'ultrawide'
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

  folders.forEach(folder => {
    // Create a direct download link styled as a button 
    const downloadLink = document.createElement('a');
    const sizeName = folder.replace(/-/g, ' ').toUpperCase();
    downloadLink.href = `images/${folder}/${imageFileName}`;
    downloadLink.download = `${imageFileName.split('.')[0]}-${folder}.jpg`;
    downloadLink.textContent = sizeName;
    downloadLink.classList.add('download-link');
    
    const button = document.createElement('div');
    button.classList.add('download-button');
    
    // Handle errors if the image doesn't exist in a particular format
    downloadLink.addEventListener('error', () => {
      button.classList.add('unavailable');
      button.title = `${sizeName} version is not available`;
    });
    
    button.appendChild(downloadLink);
    buttonGrid.appendChild(button);
  });
}