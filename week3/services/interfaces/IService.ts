export default interface IService<T, K> {
    getAll() : Promise<T[]>,
    getById(id: number) :  Promise<T> | undefined,
    create(data: K) :  Promise<T>,
    update(id: number, data: K) :  Promise<T>,
    delete(id: number) :  Promise<boolean>,
    checkExisting(id: number) : Promise<boolean>
};
