class SchemaAdapter {
    static async queryResponseToArray(res) {
        return await res.toArray()
    }
}

module.exports = SchemaAdapter