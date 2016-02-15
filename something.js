var r = false
var d = 360
var i = 1
var update_des = false
function rotate() {
    if (r) {
        if (update_des || i == 1) {
            document.getElementById("description").innerHTML = "speed = "+i
            update_des = false
        }
        document.getElementById("dog").style = "transform: rotate("+d+"deg)";
        d -= i;
        if (d <= 0) {
            d += 360;
        }
        requestAnimationFrame(rotate);
    } else {
        i *= 1.1
        update_des = true
    }
}
function toggle() {
    r = !r
    rotate();
}