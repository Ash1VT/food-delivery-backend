export default interface IDelegate {
    findFirst(data?: any): any
    findMany(data?: any): any
    create(data?: any): any
    update(data?: any): any
    delete(data?: any): any
    count(data?: any): any
}