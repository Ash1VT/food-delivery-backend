import { faker } from "@faker-js/faker"

const usedIds: BigInt[] = []
const usedStrings: string[] = []

export function getUniqueId(): bigint {
    let id = faker.number.bigInt()

    while (true) {
        if (usedIds.includes(id)) {
            id = faker.number.bigInt()
        } 
        else {
            usedIds.push(id)
            break
        }
    }

    return id
}

export function getUniqueWord(length: number): string {
    let word = faker.string.alpha(length)

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