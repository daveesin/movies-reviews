export function handleExportBackup() {
    // Get data from localStorage
    const appData = {
        reviews: JSON.parse(localStorage.getItem('reviews')) || [],
    };

    // Convert to BLOB
    const blob = new Blob([JSON.stringify(appData, null, 2)], { 
        type: 'application/json' 
    });

    //Teporary URL
    const url = URL.createObjectURL(blob);

    // Download (invisible link with html)
    const link = document.createElement('a');
    link.href = url;
    link.download = 'movies-reviews-backup.json';
    link.click();

    // Clean memory
    URL.revokeObjectURL(url);
}