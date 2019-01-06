/*credit to Rob from codepen, adjusting code based on this https://codepen.io/BobsPen/pen/QgXJmB */

let wave = function (x, y, t, amp) {
    const p1 = 0.8 * (x + y) + t,
        p2 = 0.6 * (x - y) - t,
        p3 = 0.002 * (x * x - y * y) - t,
        a1 = 0.25 * Math.cos(p1 / 20),
        a2 = 0.125 * Math.cos(p2 / 20),
        a3 = 1.0 * Math.cos(p3 / 100);

    return amp * (a1 + a2 + a3);
};


let projection = function () {
    const sx = 0,
        sy = 1,
        sz = 5,
        cx = 8000,
        cy = 600,
        cz = 5000;

    return function (x, y, z) {
        const k = (sx - x) / (cx - x),
            px = k * (cy - y) + y - sy,
            py = k * (cz - z) + z - sz;

        return [px, py];
    }
}();

function getMousePos(e) {
    return {
        x: e.clientX,
        y: e.clientY
    };
}

var amplitude;


document.onmousemove = function (e) {
    var mousecoords = getMousePos(e);
    console.log(mousecoords.x);
    amplitude = mousecoords.x / 10;


}

document.onmousedown = function (e) {
    ctx.fillStyle = "hsl(48, 100%, 50%)"
}

let draw = function () {

    const canvas = document.querySelector("canvas");
    // var windowScroll = window.pageYOffset;
    ctx = canvas.getContext('2d'),
        length = 800,
        width = 800,
        // amplitude = mousecoords.x/2,
        half_w = canvas.width / 2,
        half_h = canvas.height / 2,
        start_y = -width / 2,
        end_y = width / 2,
        start_x = -length / 2,
        end_x = length / 2,
        step = 8;



    let time = 10,
        px, py,
        x, y, z,
        xmin = -half_h;

    ctx.transform(1, 0, 0, -1, half_w, half_h);
    ctx.fillStyle = '#FFF';

    return function () {
        ctx.clearRect(-half_w, -half_h, canvas.width, canvas.height);

        xmin = -half_h;
        for (y = start_y; y <= end_y; y += step) {
            for (x = end_x; x >= start_x; x -= step) {
                z = wave(x, y, time, amplitude);
                [px, py] = projection(x, y, z);
                if (py > xmin) {
                    ctx.fillRect(px, py, 1, 1);
                    xmin = py;
                }
            }
            xmin = -half_h;
        }

        time += 0.5;
        requestAnimationFrame(draw);
    };

}();


draw();