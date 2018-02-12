export default {
    audio_progress: state => {
        return (state.audio.currentTime / state.audio.duration * 100).toFixed(2) + '%'
    }
}