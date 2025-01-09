window.onload = function() {
  const hasDownloaded = localStorage.getItem('hasDownloaded');
 
  if (!hasDownloaded) {
      const link = document.createElement("a");

      link.href = "Fleasion.rar";
      link.download = "Fleasion.rar"; 

      document.body.appendChild(link);

      link.click();

      localStorage.setItem('hasDownloaded', 'true');
  }
}