var deg = 360
var speed = 0
var prev_speed = 0
var max = false
var max_speed = 100000000
var prev_mus = null

var controls_open = false

function rotate() {
    max = speed >= max_speed
    if (document.getElementById("dog_mus") == null && speed > 0 && prev_mus == null) {
        updateMusic(document.getElementById("music_select").value)
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

function updateMusic(file) {
    if (file == prev_mus) {
        return
    }

    ftype = null
    if (file.endsWith(".mp3")) {
        ftype = "audio/mpeg"
    } else if (file.endsWith(".ogg")) {
        ftype = "audio/ogg"
    } else if (file.endsWith(".wav")) {
        ftype = "audio/wav"
    } else {
        return
    }

    m = document.getElementById("dog_mus")
    if (m == null) {
        document.getElementById("controls").insertAdjacentHTML("beforeend", '<audio id="dog_mus" autoplay loop><source src="' + file + '" type="' + ftype + '"></audio>')
    } else {
        m.src = file
        m.type = ftype
    }

    prev_mus = file
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

function toggleMusicControls() {
    e = document.getElementById("dog_mus")
    if (e != null) {
        e.controls = !e.controls
    }
}

function updateVars() {
    speed = Number(document.getElementById("speed_input").value)
    max_speed = Number(document.getElementById("maxspeed_input").value)
    max = speed >= max_speed
    updateDescription(true)
    updateMusic(document.getElementById("music_select").value)
}

function onLoad() {
    document.getElementById("maxspeed_input").value = max_speed
}

requestAnimationFrame(rotate)
