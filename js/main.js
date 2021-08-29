(function (window, app) {
    window.onload = function() {
        const fireworks = new app.Fireworks();

        fireworks.render();
    }
})(window, window.APP);