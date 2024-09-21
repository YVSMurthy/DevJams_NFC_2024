class MongoRepository {
    #api = null
    constructor(api) {
        this.#api = api
    }
    async getData(queryParams) {
        return await this.#api.getData(queryParams)
    }
}

module.exports = MongoRepository