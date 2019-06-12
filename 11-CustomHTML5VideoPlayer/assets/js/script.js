const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
const fullscreen = player.querySelector('.fullscreen')

function togglePlay() {
    const method = video.paused ? 'play' : 'pause'
    video[method]()
}

function updateButton() {
    const icon = this.paused ? '&#9658' : '&#9616;&#9616;'
    toggle.innerHTML = icon
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
    video[this.name] = this.value
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`

}

function handleProgressUpdate(e) {
    const time = (e.offsetX / progress.offsetWidth) * video.duration
    
    video.currentTime = time
}

function makeFullScreen() {
    video.webkitRequestFullScreen()
}


video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)


toggle.addEventListener('click', togglePlay)
ranges.forEach(slider => slider.addEventListener('change', handleRangeUpdate))
ranges.forEach(slider => slider.addEventListener('mousemove', handleRangeUpdate))
skipButtons.forEach(button => button.addEventListener('click', skip))

let mousedown = false
progress.addEventListener('click', handleProgressUpdate)
progress.addEventListener('mousemove', (e) => mousedown && handleProgressUpdate(e))
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)

fullscreen.addEventListener('click', makeFullScreen)