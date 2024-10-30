window.onload = function() {
    // Create a link element
    const link = document.createElement("a");

    // Set the file URL (local or external) and download attribute
    link.href = "fleasion.zip"; // Replace with your file URL
    link.download = "fleasion.zip"; // Optional: Set the downloaded file name

    // Append link to the body (required for some browsers)
    document.body.appendChild(link);

    // Simulate a click on the link to start download
    link.click();
  };