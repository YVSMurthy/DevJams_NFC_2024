class CollectionManager {
    #activeCollection = null
    #activeCollectionName = null
    setActiveCollection(collectionName, db) {
        this.#activeCollectionName = collectionName
        this.#activeCollection = db.collection(collectionName)
        console.log(`Active Collection successfull switched to ${this.#activeCollectionName}`)
    }

    getActiveCollectionName() {
        return this.#activeCollectionName
    }

    getActiveCollection() {
        return this.#activeCollection
    }

    async getData(queryParams) {
        let res = await this.#activeCollection.find(queryParams).toArray()
        return res
   }
}

module.exports = CollectionManager