const path = "https://raw.githubusercontent.com/Rhysn/RulesForSurge/main/jsdelivr/jsdelivr_purge"

async function gatherResponse(response) {
    const { headers } = response
    const contentType = headers.get("content-type") || ""
    if (contentType.includes("application/json")) {
        return JSON.stringify(await response.json())
    }
    else if (contentType.includes("application/text")) {
        return await response.text()
    }
    else if (contentType.includes("text/html")) {
        return await response.text()
    }
    else {
        return await response.text()
    }
}

async function purge() {
    const init = {
        headers: {
            "content-type": "text/html;charset=UTF-8",
        },
    }
    const response = await fetch(path, init)
    const results = await gatherResponse(response)
    var url_arr = results.toString().split(/\n/)

    for (let item of url_arr) {
        await fetch(item)
    }

    return new Response('0K', { status: 200 })
}

addEventListener('scheduled', event => {
    event.waitUntil(purge())
})

addEventListener("fetch", event => {
    return event.respondWith(purge())
})