function uIdGenerator() {
    let id = 1;
    return function uIdInc() {
        return id++;
    }
}

const getUId = uIdGenerator();
const getAltUId = uIdGenerator();

export {
    getUId,
    getAltUId
};
