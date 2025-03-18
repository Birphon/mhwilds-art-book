// Images catalog - replace this with your actual image list
const imagesCatalog = [
    "ajarakan.jpg",
    "arkveld-1.jpg",
    "arkveld-2.jpg",
    "alma.jpg",
    "azuz-people.jpg",
    "balahara.jpg",
    "chatacabra.jpg",
    "doshaguma.jpg",
    "endemic-life-1.jpg",
    "endemic-life-2.jpg",
    "endemic-life-3.jpg",
    "erik.jpg",
    "fabious.jpg",
    "gemma.jpg",
    "hope-female.jpg",
    "hope-male.jpg",
    "hunter-palico.jpg",
    "lala-barina.jpg",
    "nata.jpg",
    "oilwell-basin-1.jpg",
    "oilwell-basin-2.jpg",
    "oilwell-basin-3.jpg",
    "oilwell-basin-4.jpg",
    "oilwell-basin-5.jpg",
    "oilwell-basin-6.jpg",
    "oliva.jpg",
    "olivia-athos.jpg",
    "quematrice.jpg",
    "rey-dau.jpg",
    "rompopolo.jpg",
    "sandfolk.jpg",
    "scarlet-forest-1.jpg",
    "scarlet-forest-2.jpg",
    "scarlet-forest-3.jpg",
    "scarlet-forest-4.jpg",
    "scarlet-forest-5.jpg",
    "seikret.jpg",
    "uth-duna.jpg",
    "werner.jpg",
    "windsong-village.jpg",
    "windward-plains-1.jpg",
    "windward-plains-2.jpg",
    "windward-plains-3.jpg",
    "windward-plains-4.jpg",
    "windward-plains-5.jpg",
    "windward-plains-6.jpg",
    "wudwud-hideout.jpg",
    "wudwud.jpg"
  ];
  
  const galleryContainer = document.querySelector(".gallery");
  const searchInput = document.getElementById("search-input");
  
  // Function to render the gallery
  function renderGallery(images) {
    // Clear the gallery first
    galleryContainer.innerHTML = "";
    
    // Loop over images and create a gallery entry for each
    images.forEach(imageName => {
      const imgWrapper = document.createElement("div");
      imgWrapper.classList.add("gallery-item");
      
      const imgElement = document.createElement("img");
      imgElement.src = `images/header/${imageName}`;
      imgElement.alt = imageName.split('.')[0].replace(/-/g, ' ');
      imgElement.loading = "lazy"; // Add lazy loading for better performance
      imgElement.onclick = () => window.location.href = `image.html?img=${imageName}`;
      
      const imgName = document.createElement("div");
      imgName.classList.add("image-name");
      imgName.textContent = imgElement.alt;
      
      imgWrapper.appendChild(imgElement);
      imgWrapper.appendChild(imgName);
      galleryContainer.appendChild(imgWrapper);
    });
    
    // Display message if no images match the search
    if (images.length === 0) {
      const noResults = document.createElement("p");
      noResults.classList.add("no-results");
      noResults.textContent = "No images found matching your search.";
      galleryContainer.appendChild(noResults);
    }
  }
  
  // Initialize the gallery with all images
  renderGallery(imagesCatalog);
  
  // Search functionality
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredImages = imagesCatalog.filter(img => 
        img.toLowerCase().replace(/[.-]/g, ' ').includes(searchTerm)
      );
      renderGallery(filteredImages);
    });
  }