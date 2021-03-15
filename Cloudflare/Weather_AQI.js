//替换脚本中Token
const path = "https://raw.githubusercontent.com/Rhysn/RulesForSurge/main/Scripts/Weather/iOS_Weather_AQI_Standard.js"
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

async function weather(event) {
    const getReqHeader = (key) => event.request.headers.get(key);
    
    const theUrl = new URL(event.request.url);
    const token = theUrl.pathname.startsWith("\/aqi\/") ? theUrl.pathname.replace("\/aqi\/","") : theUrl.pathname.replace("\/","");
    
    
    const init = {
        method: event.request.method,
        headers: {
            'User-Agent': getReqHeader("User-Agent"),
            'Accept': getReqHeader("Accept"),
            'Accept-Language': getReqHeader("Accept-Language"),
            'Accept-Encoding': getReqHeader("Accept-Encoding"),
            'Connection': 'keep-alive',
            "content-type": "application/x-javascript;charset=UTF-8",
        },
    }
    const response = await fetch(path, init);
    const results = await gatherResponse(response);
    var weather_aqi = `let aqicnToken = '${token}'\n\n` + results.toString();

    return new Response(weather_aqi, init)
}

addEventListener("fetch", event => {
    return event.respondWith(weather(event))
})