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


export function handleImportBackup(file, onSuccess) {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
        try {
            const data = JSON.parse(event.target.result);

            // Validate the reviews key in the file and if it is an array
            if (!data || !Array.isArray(data.reviews)) {
                alert('Formato de arquivo de backup inválido!');
                return;
            }

            // Erase the current item in the localStorage
            localStorage.removeItem('reviews');

            // Save the backup on localStorage
            localStorage.setItem('reviews', JSON.stringify(data.reviews));

            // Callback to create other actions based on success
            if (onSuccess) onSuccess();

        } catch (error) {
            alert('Erro ao ler o arquivo JSON de backup.');
            console.error(error);
        }
    };

    reader.readAsText(file);
}

export function handleCleanAllData() {
    // Erase all the keys created by this domain in local storage:
    localStorage.clear();
}