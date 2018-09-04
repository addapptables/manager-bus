export class InvalidMetadataException extends Error {
    constructor(prototypeName) {
        super(`Invalid metadata exception. Metadata not found at ${prototypeName}.`);
    }
}
