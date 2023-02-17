export default function handleTokenExpiration() {
    alert('Access expired, removing token...')
    console.debug('Access expired, removing token...')
    localStorage.removeItem('token')
    window.location.reload()
}
