import { faker } from "@faker-js/faker"

const usedIds: BigInt[] = []
const usedStrings: string[] = []

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
    return Number(getUniqueBigIntId())
}

export function getUniqueWord(length: number): string {
    let word = faker.lorem.word(length)

    while (true) {
        if (usedStrings.includes(word)) {
            word = faker.lorem.word(length)
        }
        else {
            usedStrings.push(word)
            break
        }
    }
    
    return word
}