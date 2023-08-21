
export default function checkValidForm(formEntries: { [s: string]: unknown; } | ArrayLike<string>) {
    let result = true;
    if (typeof formEntries !== undefined) {
        for (let i = 0; i < Object.entries(formEntries).length; i++) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (Object.entries(formEntries)[i][1] === '' || Object.entries(formEntries)[i][1] === undefined) {
                result = false;
            }

        }
    }
    return result;
}