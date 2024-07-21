document.addEventListener("DOMContentLoaded", () => {
  const images = [
    "img1", "img2", "img3", "img4", "img5"
  ];

  const duplicateIndex = Math.floor(Math.random() * images.length);
  const selectedImages = [...images, images[duplicateIndex]];

  selectedImages.sort(() => Math.random() - 0.5);

  const imageContainer = document.getElementById("image-container");
  const resetButton = document.getElementById("reset");
  const verifyButton = document.getElementById("verify");
  const para = document.getElementById("para");

  let selectedTiles = [];
  
  function renderImages() {
    selectedImages.forEach((imageClass, index) => {
      const img = document.createElement("img");
      img.classList.add(imageClass);
      img.dataset.index = index;
      img.addEventListener("click", handleImageClick);
      imageContainer.appendChild(img);
    });
  }

  function handleImageClick(e) {
    const img = e.target;
    const index = img.dataset.index;

    if (selectedTiles.includes(index)) return;

    img.classList.add("selected");
    selectedTiles.push(index);

    if (selectedTiles.length > 0) {
      resetButton.style.display = "block";
    }
    
    if (selectedTiles.length === 2) {
      verifyButton.style.display = "block";
    } else {
      verifyButton.style.display = "none";
    }
  }

  function handleReset() {
    selectedTiles = [];
    resetButton.style.display = "none";
    verifyButton.style.display = "none";
    para.textContent = "";
    imageContainer.querySelectorAll("img").forEach(img => img.classList.remove("selected"));
  }

  function handleVerify() {
    if (selectedTiles.length !== 2) return;

    const [firstIndex, secondIndex] = selectedTiles;
    const firstImage = selectedImages[firstIndex];
    const secondImage = selectedImages[secondIndex];

    if (firstImage === secondImage) {
      para.textContent = "You are a human. Congratulations!";
    } else {
      para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }

    verifyButton.style.display = "none";
  }

  resetButton.addEventListener("click", handleReset);
  verifyButton.addEventListener("click", handleVerify);

  renderImages();
});
