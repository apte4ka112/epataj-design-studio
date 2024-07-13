import { categoriesAPI } from './categories'
import { articlesAPI } from './articles'

export type ApiType = {
    categoriesAPIClient: any
    articlesAPIClient: any
}

const categoriesAPIClient = categoriesAPI()

const articlesAPIClient = articlesAPI()

export function createApiClients(): ApiType {
    return {
        categoriesAPIClient,
        articlesAPIClient
    }
}