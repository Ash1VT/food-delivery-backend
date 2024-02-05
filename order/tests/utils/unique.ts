import { faker } from "@faker-js/faker"

const usedIds: BigInt[] = []


export function getUniqueBigIntId(): bigint {
    let id = BigInt(faker.number.int())

    while (true) {
        if (usedIds.includes(id)) {
            id = BigInt(faker.number.int())
        } 
        else {
            usedIds.push(id)
            break
        }
    }

    return id
}

export function getUniqueNumberId(): number {
    let id = BigInt(faker.number.int())

    while (true) {
        if (usedIds.includes(id)) {
            id = BigInt(faker.number.int())
        } 
        else {
            usedIds.push(id)
            break
        }
    }

    return Number(id)
}