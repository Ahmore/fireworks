(function (window, APP) {
    APP.FireworkElement = class {
        constructor(canvasContext, x, y, angle, startColor, endColor, v) {
            this.canvasContext = canvasContext;
            this.startColor = startColor;
            this.endColor = endColor;
            this.size = 0.5;
            this.lengthOfTrace = 10;

            this.velocity = {
                x: v * Math.cos(angle),
                y: v * Math.sin(angle)
            };
            this.gravity = {
                x: 0,
                y: 0.1
            };
            this.friction = {
                x: 0.05,
                y: 0.05
            }
            this.timing = {
                duration: 40,
                passed: 0
            };
            this.trace = [{
                x,
                y,
                color: startColor,
                opacity: 1
            }];

            this.done = false;
        }

        update() {
            this.timing.passed++;

            if (this.timing.passed % 2 === 0) {
                return;
            }

            this.done = this.timing.passed > this.timing.duration;

            const lastPosition = this.trace.slice(-1)[0];
            const newPosition = {
                x: lastPosition.x,
                y: lastPosition.y,
                color: this._getColor(this.timing.passed / this.timing.duration),
                opacity: 1 - this.timing.passed / this.timing.duration
            }

            this.velocity.x += this.gravity.x;
            this.velocity.y += this.gravity.y;

            this.velocity.x = Math.sign(this.velocity.x) * (Math.abs(this.velocity.x) - this.friction.x);
            this.velocity.y = Math.sign(this.velocity.y) * (Math.abs(this.velocity.y) - this.friction.y);

            newPosition.x += this.velocity.x;
            newPosition.y += this.velocity.y;

            this.trace.push(newPosition);

            // Remember only few last
            this.trace = this.trace.slice(-this.lengthOfTrace);
        }

        render() {
            if (this.done) {
                return;
            }

            this.canvasContext.beginPath();
            this.trace.forEach(position => {
                this.canvasContext.fillStyle = `rgba(${position.color}, ${position.opacity})`;
                this.canvasContext.arc(position.x, position.y, this.size, 0, 2 * Math.PI);
            })
            this.canvasContext.fill();
        }

        _getColor(animationPart) {
            return this.startColor
                .map((startColor, index) => {
                    return startColor - ((startColor - this.endColor[index]) * animationPart)
                })
                .join(", ");
        }
    }
})(window, window.APP);