import { FAKEDB } from "../db/FAKEDB";

let id = 2

class BorgersService{
    getAll() {
        return FAKEDB.borgers
    }

    create(newBorger) {
        newBorger.id = id++
        FAKEDB.borgers.push(newBorger)
        return newBorger
    }

    delete(id) {
        findBorger(id)
        FAKEDB.borgers = FAKEDB.borgers.filter(c => c.id != id)
    }
    edit(editedBorger, id) {
        const foundBorger = findBorger(id)
        Object.keys(editedBorger).forEach(key => {
            foundBorger[key] = editedBorger[key]
        })
        return foundBorger
    }

    getOne(id) {
        const foundBorger = findBorger(id)
        return foundBorger
    }
}


function findBorger(id) {
    let foundBorger = FAKEDB.borgers.find(c => c.id == id)
    if (!foundBorger) { throw new Error("invalid id") }
    return foundBorger
}

export const borgersService = new BorgersService()