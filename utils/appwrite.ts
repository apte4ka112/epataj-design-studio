import { Account, Client, Databases, Storage } from 'appwrite'

export const client = new Client()
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('668a593b001aa912cde7')

export const account = new Account(client)
export { ID } from 'appwrite'
export const DB = new Databases(client)
export const storage = new Storage(client)
