export default interface IModel<T, K> {
    getAll() : T[],
    getById(id: string) : T | undefined,
    create(data: K) : T,
    update(id: string, data: K) : T,
    delete(id: string) : T | undefined,
    checkExisting(id: string) : boolean
}