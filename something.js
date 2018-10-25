var deg = 360
var speed = 0
var prev_speed = 0
var max = false
var max_speed = 100000000

var controls_open = false

function rotate() {
    max = speed >= max_speed
    if (document.getElementById("dog_mus") == null && speed > 0) {
        document.body.insertAdjacentHTML("afterbegin", '<audio id="dog_mus" autoplay loop><source src="mus_dogappearRemade.mp3" type="audio/mpeg"></audio>')
    }
    if (Number(document.getElementById("speed_input").value) == prev_speed) {
        document.getElementById("speed_input").value = speed
    }
    updateDescription(false)
    document.getElementById("dog").style = "transform: rotate("+deg+"deg)"
    deg -= speed
    while (deg <= 0) {
        deg += 360
    }
    requestAnimationFrame(rotate)
}

function updateDescription(fromControls) {
    if (prev_speed != speed || fromControls) {
        prev_speed = speed
        document.getElementById("description").innerHTML = "speed = "+(speed.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ","))
    }
    if (max) {
        document.getElementById("description").innerHTML = "the dog is going fast enough please spare him"
    }
}

function increase() {
    if (max) {
        console.log("you monster")
        return;
    }
    if (speed == 0) {
        speed++
    } else {
        speed += (speed/Math.floor(rand(18,22)))+1
    }
}

function rand(min, max) {
    return Math.random()*(max-min)+min;
}

function toggleControls() {
    if (controls_open) {
        document.getElementById("controls_button").innerHTML = "+"
        document.getElementById("controls").style.display = "none"
    } else {
        document.getElementById("controls_button").innerHTML = "-"
        document.getElementById("controls").style.display = ""
    }
    controls_open = !controls_open
}

function updateVars() {
    speed = Number(document.getElementById("speed_input").value)
    max_speed = Number(document.getElementById("maxspeed_input").value)
    max = speed >= max_speed
    updateDescription(true)
}

function onLoad() {
    document.getElementById("maxspeed_input").value = max_speed
}

requestAnimationFrame(rotate)
