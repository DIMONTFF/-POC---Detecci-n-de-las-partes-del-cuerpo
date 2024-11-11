class Controlador {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
        this.iniciarWebcam();

        // Configurar los callbacks de eventos
        this.vista.onCapture(() => this.manejarBoton());
    }

    // Iniciar la cámara
    async iniciarWebcam() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            this.vista.videoElement.srcObject = stream;
            this.vista.videoElement.play();
        } catch (error) {
            console.error("Error al acceder a la cámara:", error);
        }
    }

    // Manejar el evento del botón: cuando se presiona
    manejarBoton() {
        const buttonText = this.vista.captureButton.textContent;

        if (buttonText === 'Capturar') {
            this.iniciarCuentaRegresiva();
        } else {
            this.volverACamara();
        }
    }

    // Iniciar cuenta regresiva de 3 segundos
    iniciarCuentaRegresiva() {
        let countdown = 3;
        this.vista.timerElement.style.display = 'block';
        this.vista.timerElement.textContent = countdown;
        this.vista.sliderElement.value = 0;

        const intervalId = setInterval(() => {
            countdown -= 1;
            this.vista.timerElement.textContent = countdown;
            this.vista.sliderElement.value = (3 - countdown) * 33; // Rellenar el slider según el tiempo

            if (countdown === 0) {
                clearInterval(intervalId);
                this.vista.timerElement.style.display = 'none';
                this.vista.sliderElement.value = 0; // Restablecer el slider
                this.capturarImagen(); // Capturar la imagen
            }
        }, 1000);
    }

    // Capturar la imagen
    capturarImagen() {
        const canvas = document.createElement('canvas');
        canvas.width = this.vista.videoElement.videoWidth;
        canvas.height = this.vista.videoElement.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(this.vista.videoElement, 0, 0, canvas.width, canvas.height);
        this.vista.capturedImageElement.src = canvas.toDataURL('image/png');

        // Ocultar la cámara y mostrar la imagen capturada
        this.vista.toggleCamera(false);

        // Cambiar el texto del botón a "Reintentar"
        this.vista.updateText(this.vista.captureButton, 'Reintentar');

        // Realizar la predicción
        this.realizarPrediccion(canvas);
    }

    // Volver a mostrar la cámara y ocultar la imagen capturada
    volverACamara() {
        this.vista.toggleCamera(true);

        // Cambiar el texto del botón a "Capturar"
        this.vista.updateText(this.vista.captureButton, 'Capturar');
    }

    // Realizar la predicción sobre la imagen capturada
    async realizarPrediccion(imageElement) {
        const resultado = await this.modelo.realizarPrediccion(imageElement);
        this.vista.updateText(this.vista.predictionElement, `Predicción: ${resultado}`);
    }
}
