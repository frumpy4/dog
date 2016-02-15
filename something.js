var deg = 360
var speed = 0
var prev_speed = 0
var des = ""
var max = false
var max_speed = 2000000

function rotate() {
    max = speed >= max_speed
    if (prev_speed != speed) {
        prev_speed = speed
        des = "speed = "+speed
        if (max) {
            des = "the dog is going fast enough please spare him"
        }
        document.getElementById("description").innerHTML = des
    }
    document.getElementById("dog").style = "transform: rotate("+deg+"deg)"
    deg -= speed
    while (deg <= 0) {
        deg += 360
    }
    requestAnimationFrame(rotate)
}

function increase() {
    if (max) {
        console.log("you monster")
        return;
    }
    if (speed == 0) {
        speed++
    } else {
        speed *= 1.1
    }
}
requestAnimationFrame(rotate)
