(function (window, APP) {
    APP.Fireworks = class {
        constructor() {
            this.canvas = this.createCanvas();
            this.canvasContext = this.canvas.getContext("2d");
            this.fireworks = new Array(2)
                .fill(null)
                .map(_ => this.createFirework());
        }

        createCanvas() {
            const canvas = document.createElement("canvas");

            canvas.style.display = "block";
            canvas.style.border = "1px solid black";
            canvas.style.width = "320px";
            canvas.style.height = "180px";
            canvas.width = 320;
            canvas.height = 180;

            document.body.prepend(canvas);

            return canvas;
        }

        createFirework() {
            return new APP.Firework(
                this.canvasContext,
                Math.random() * this.canvas.width,
                this.canvas.height,
                (0.5 * Math.random() + 0.5) * this.canvas.height
            );
        }

        update() {
            this.fireworks = this.fireworks.filter(firework => !firework.done);

            if (Math.random() < 0.05) {
                this.fireworks.push(this.createFirework());
            }
        }

        render() {
            this.clear();

            this.update();
            this.fireworks.forEach(firework => {
                firework.update();
                firework.render();
            });

            requestAnimationFrame(this.render.bind(this));
        }

        clear() {
            this.canvasContext.fillStyle = "black";
            this.canvasContext.fillRect(0,0, this.canvas.width, this.canvas.height);
        }
    }
})(window, window.APP)