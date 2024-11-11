class Modelo {
    constructor() {
        this.model = null;
        this.cargarModelo();
    }

    async cargarModelo() {
        try {
            const modelURL = "https://teachablemachine.withgoogle.com/models/2iakE6Ea5/";
            this.model = await tmImage.load(modelURL + "model.json", modelURL + "metadata.json");
            console.log("Modelo de Teachable Machine cargado");
        } catch (error) {
            console.error("Error al cargar el modelo:", error);
        }
    }

    async realizarPrediccion(imageElement) {
        if (this.model) {
            const predictions = await this.model.predict(imageElement);
            const mejorPrediccion = predictions.reduce((prev, curr) =>
                prev.probability > curr.probability ? prev : curr
            );

            if (mejorPrediccion.probability >= 0.6) {
                return `${mejorPrediccion.className} (${(mejorPrediccion.probability * 100).toFixed(2)}%)`;
            } else {
                return "DESCONOCIDO";
            }
        }
    }
    
}
