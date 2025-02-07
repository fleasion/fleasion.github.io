document.getElementById('downloadButton').addEventListener('click', function() {
  const popup = document.createElement('div');
  popup.id = 'myPopup';
  popup.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    width: 75%;
    height: auto;
    text-align: center;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.1);
    padding: 5% 5%;
    border-radius: 250px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
  `;

  const popupContent = document.createElement('p');
  popupContent.innerHTML = `
    1. Unzip the downloaded archive with software like <a href="https://www.7-zip.org/download.html/" style="color: #a659d2" >7-Zip</a>.
    <br>
    &nbsp;&nbsp;&nbsp;The archive didn't get downloaded? <a style="color: #a659d2" href="https://github.com/fleasion/Fleasion/archive/refs/tags/CLI.zip">Download it manually</a>.
    <br><br>
    2. Run <b><a class="underscore">run.bat</a></b>.
    <br>
    &nbsp;&nbsp;&nbsp;It should set up Python and it's dependencies for Fleasion.
  `;
  popup.appendChild(popupContent);

  document.body.appendChild(popup);

  function applyFilters() {
    const allElements = document.querySelectorAll('body > *:not(#myPopup):not(#overlay)');
    allElements.forEach(element => {
      element.style.filter = 'blur(10px)';
      element.style.opacity = '0.5';
      element.style.transition = 'filter 0.3s ease, opacity 0.3s ease';
    });
  }

  function removeFilters() {
    const allElements = document.querySelectorAll('body > *:not(#myPopup):not(#overlay)');
    allElements.forEach(element => {
      element.style.filter = 'none';
      element.style.opacity = '1';
      element.style.transition = 'filter 0.3s ease, opacity 0.3s ease';
    });
  }

  applyFilters();

  const overlay = document.createElement('div');
  overlay.id = "overlay";
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  `;
  document.body.appendChild(overlay);

  // Event listeners (No close button):
  overlay.addEventListener('click', function(event) {
    if (event.target === overlay) {
      document.body.removeChild(popup);
      document.body.removeChild(overlay);
      removeFilters();
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
      document.body.removeChild(popup);
      document.body.removeChild(overlay);
      removeFilters();
    }
  });
});