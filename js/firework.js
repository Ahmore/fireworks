(function (window, APP) {
    APP.Firework = class {
        constructor(canvasContext, x, y, height) {
            this.canvasContext = canvasContext;
            this.x = x;
            this.y = y;
            this.explosionY = this.y - height;
            this.size = 1;

            const startColor = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
            const endColor = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
            const velocity = Math.random() * 2 + 2;
            this.fireworkElements =
                new Array(25)
                    .fill(null)
                    .map(_ => new APP.FireworkElement(
                        canvasContext,
                        this.x,
                        this.explosionY,
                        Math.random() * 2 * Math.PI,
                        startColor,
                        endColor,
                        velocity
                    ));
            this.done = false;

            this.gravity = {
                y: 0.1
            };
            this.velocity = {
                y: Math.sqrt(2 * this.gravity.y * height)
            };
        }

        update() {
            this.velocity.y = Math.max(0, this.velocity.y - this.gravity.y);
            this.y = Math.max(this.y - this.velocity.y, this.explosionY);
            this.done = this.fireworkElements.every(fireworkElement => fireworkElement.done);
        }

        render() {
            if (this.done) {
                return;
            }

            // this.explosionY + 4 - innaccuracy of gravity algorithm
            if (this.y > this.explosionY + 4) {
                this.canvasContext.beginPath();
                this.canvasContext.fillStyle = "white";
                this.canvasContext.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
                this.canvasContext.fill();
            } else {
                this.fireworkElements
                    .forEach(fireworkElement => {
                        fireworkElement.update();
                        fireworkElement.render();
                    });
            }
        }
    }
})(window, window.APP);