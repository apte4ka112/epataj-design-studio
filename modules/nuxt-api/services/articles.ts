export const articlesAPI = () => {
    async function getArticles () {
        const response = await DB.listDocuments("epataj-database", "news");
        return response
    }
    return {
        getArticles
    }
}