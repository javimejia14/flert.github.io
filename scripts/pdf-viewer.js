document.addEventListener('DOMContentLoaded', function() {
    const pdfContainer = document.querySelector('.pdf-container');
    const fallbackMessage = document.querySelector('.fallback-message');

    function checkPdfSupport() {
        const pdfObject = pdfContainer.querySelector('embed');
        
        if (pdfObject && pdfObject.type === 'application/pdf') {
            // PDF es soportado
            fallbackMessage.style.display = 'none';
        } else {
            // PDF no es soportado
            fallbackMessage.style.display = 'block';
            pdfContainer.innerHTML = '<p>Su navegador no soporta la visualización de PDFs integrados. Por favor, use el enlace de descarga a continuación.</p>';
        }
    }

    // Verificar soporte de PDF después de un breve retraso para asegurar que el embed se haya cargado
    setTimeout(checkPdfSupport, 1000);
});