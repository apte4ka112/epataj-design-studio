export const categoriesAPI = () => {
    async function getCategories() {
        const response = await DB.listDocuments("epataj-database", "categories");
        return response
    }

    return { getCategories }
}