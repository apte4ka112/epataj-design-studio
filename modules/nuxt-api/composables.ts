import {type ApiType, createApiClients} from './services'

export function createApi () {
    const runtimeConfig = useRuntimeConfig()
    return createApiClients()
}

export function useAPI (): ApiType {
    return createApi()
}