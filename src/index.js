import axios from 'axios'

let SERVICE_URL = 'http://localhost'

const protocols = {
    HTTP: 'http',
    HTTPS: 'https',
    SOCKS4: 'socks4',
    SOCKS5: 'socks5',
}

/**
 * @param {string[]} protocols
 * @param {string[]} countryCodes
 * @param {Number|null} maxPing
 * @return {Object}
 */
const getFilters = (protocols, countryCodes, maxPing) => {
    let filters = {}

    if (protocols.length) {
        filters.protocols = protocols.join(',')
    }

    if (countryCodes.length) {
        filters.country_codes = countryCodes.join(',')
    }

    if (maxPing) {
        filters.max_ping = maxPing
    }

    return filters
}

/**
 * @param {string} url
 */
const setServiceUrl = url => SERVICE_URL = url

/**
 * @param {string[]} protocols
 * @param {string[]} countryCodes
 * @param {Number|null} maxPing
 * @return {Promise<Object|null>}
 */
const getProxyList = async (protocols = [], countryCodes = [], maxPing = null) => {
    let response = await axios.get(`${SERVICE_URL}/proxies`, {params: getFilters(protocols, countryCodes, maxPing)})

    return response.data
}

export { protocols, setServiceUrl, getProxyList }
