class Vista {
    constructor() {
        this.videoElement = document.getElementById('video');
        this.capturedImageElement = document.getElementById('capturedImage');
        this.timerElement = document.getElementById('timer');
        this.predictionElement = document.getElementById('prediction');
        this.captureButton = document.getElementById('button');
        this.sliderElement = document.getElementById('slider');

        // Inicialmente, ocultamos la imagen capturada
        this.capturedImageElement.style.display = 'none';
    }

    // Manejadores de eventos
    onCapture(callback) {
        this.captureCallback = callback;
        this.captureButton.addEventListener('click', () => this.handleCaptureClick());
    }

    handleCaptureClick() {
        if (this.captureCallback) this.captureCallback();
    }

    updateText(element, text) {
        element.textContent = text;
    }

    // Cambiar la visibilidad de la cámara y la imagen
    toggleCamera(isVisible) {
        this.videoElement.style.display = isVisible ? 'block' : 'none';
        this.capturedImageElement.style.display = isVisible ? 'none' : 'block';
    }
}