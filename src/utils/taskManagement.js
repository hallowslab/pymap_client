import authenticatedFetch from "./apiFetcher"

const handleDelete = async (selectedRows) => {
    if (selectedRows.length <= 0) {
        alert('You need to select a task')
    } else {
        console.debug(selectedRows)
        const confirmed = window.confirm(
            'Are you sure you want to delete the task(s)?'
        )
        if (confirmed) {
            const APIURL = '/api/v2/admin/delete-tasks'
            const DATA = { task_ids: selectedRows }
            console.debug('Requesting delete of task IDs:', selectedRows)
            let res = await authenticatedFetch(APIURL, DATA, 'POST')
            console.debug("RES",res)
            console.debug(".message",res.message)
            console.debug(".error",res.error)
            alert(JSON.stringify(res.message, null, 2))
        }
    }
}

const handleArchive = async (selectedRows) => {
    if (selectedRows.length <= 0) {
        alert('You need to select a task')
    } else {
        console.debug(selectedRows)
        const confirmed = window.confirm(
            'Are you sure you want to archive the task(s)?'
        )
        if (confirmed) {
            const APIURL = '/api/v2/admin/archive-tasks'
            const DATA = { task_ids: selectedRows }
            let res = await authenticatedFetch(APIURL, DATA, 'POST')
            console.debug("RES",res)
            console.debug(".message",res.message)
            console.debug(".error",res.error)
            alert(JSON.stringify(res.message, null, 2))
        }
    }
}

const handleCancel = async (selectedRows) => {
    if (selectedRows.length <= 0) {
        alert('You need to select a task')
    } else {
        console.debug(selectedRows)
        const confirmed = window.confirm(
            'Are you sure you want to cancel the task(s)'
        )
        if (confirmed) {
            const APIURL = 'api/v2/admin/cancel-tasks'
            const DATA = { task_ids: selectedRows }
            let res = authenticatedFetch(APIURL, DATA, 'POST')
            console.debug("RES",res)
            console.debug(".message",res.message)
            console.debug(".error",res.error)
            alert(JSON.stringify(res.message, null, 2))
        }
    }
}

export {handleArchive,handleCancel,handleDelete}