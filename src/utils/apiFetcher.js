// Wrapper for api calls
/* 
Takes an URL and optionally body and method,
method defaults to GET as it's the most common operation,
in case of POST body should always be provided, do not stringify as it's already handled
*/
export default async function authenticatedFetch(url, body=undefined, method='GET') {
    const params = {
        headers: {
            accepts: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        method: method,
    }

    if (body !== undefined) {
        params.body = body
    }

    try {
        const response = await fetch(url, params)
        console.debug("raw data",response)
        let data = await response.json()
        console.debug("jdata",data)
        if (data.error === undefined) {
            data.error = false
        }
        return data
    } catch (error) {
        console.debug(error)
        return error
    }
}
