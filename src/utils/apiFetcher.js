export default async function authenticatedFetch(url, params) {
    try {
        const response = await fetch(url, params)
        let data = await response.json()
        if (data.error === undefined) {
            data.error = false
        }
        return data
    } catch (error) {
        console.debug(error)
        return error
    }
}
