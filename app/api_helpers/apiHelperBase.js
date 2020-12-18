export default class ApiHelperBase {
    apiUrl;
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }
    async fetch(input, params, init) {
        let url = new URL(this.apiUrl + input);
        Object.keys(params || {}).forEach(key => url.searchParams.append(key, params[key]));
        const response = await fetch(url.toString(), init);
        return response.json();
    }
    async get(input, params) {
        return await this.fetch(input, params, { method: 'GET' });
    }
}