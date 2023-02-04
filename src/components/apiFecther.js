
export default function authenticatedFetch(url, method, ) {
    let message
    const params = {
        headers: {
            accepts: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        method: method,
    }
    fetch(url, params).then((data) => {
        return data.json()
    }).then((res) => {
        message = res
    }).catch((err) => message = err)
    return message
}