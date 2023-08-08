

export default function checkValidForm(formEntries: object) {
    let result = true;
    for (let i = 0; i < Object.entries(formEntries).length; i++) {
        if (Object.entries(formEntries)[i][1] === '' || Object.entries(formEntries)[i][1] === undefined) {
            result = false;
        }
    }
    return result;
}