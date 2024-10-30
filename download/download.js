window.onload = function() {
  const hasDownloaded = localStorage.getItem('hasDownloaded');
 
  if (!hasDownloaded) {
      const link = document.createElement("a");

      link.href = "fleasion.zip";
      link.download = "fleasion.zip"; 

      document.body.appendChild(link);

      link.click();

      localStorage.setItem('hasDownloaded', 'true');
  }
}