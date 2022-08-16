var CurrentSession = (() => {
    var getLatestTask = () => {
        return localStorage.getItem('latestTask')
    }

    var setLatestTask = (taskID) => {
        localStorage.setItem('latestTask', taskID)
    }

    return {
        getLatestTask: getLatestTask,
        setLatestTask: setLatestTask,
    }
})()

export { CurrentSession }
