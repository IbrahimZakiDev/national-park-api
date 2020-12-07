
const apiKey = 'pF0wUSscuP4veMvmdeWfb9d34k7mcJ33rL5SR4mF'

const searchUrl = 'https://developer.nps.gov/api/v1/parks'

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&')
}

function displayResults(json) {
    console.log(json)
    $('#results').empty()
    for (let i=0; i<json.data.length; i++) {


    $('#results').append(`
    <h3>${json.data[i].fullName}</h3>
    <p>${json.data[i].description}</p>
    <p>click <a href='${json.data[i].url}'>here</a> for more info</p>
    `)
    }
}

function getParkData(query, maxResults=10) {
    const params = {
        limit: maxResults,
        q: query,
        api_key: apiKey
    }
    const queryString = formatQueryParams(params)
    console.log(queryString)
    const url = searchUrl + '?' + queryString
    console.log(url)

    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json()
        }
        throw new Error(response.statusText)
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`)
    })
}

function handleSubmit() {
    $('form').submit(e => {
        e.preventDefault()
        const location = $('#location').val()
        const maxResults = $('#js-max-results').val()
        getParkData(location, maxResults)
    })
}


$(handleSubmit)


//https://developer.nps.gov/api/v1/parks?limit=10&q=tampa&api_key=pF0wUSscuP4veMvmdeWfb9d34k7mcJ33rL5SR4mF
