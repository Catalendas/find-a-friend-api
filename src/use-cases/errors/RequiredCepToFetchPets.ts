export class RequiredCepToFetchPets extends Error {
    constructor() {
        super("You must enter a zip code to list your pets.")
    }
}