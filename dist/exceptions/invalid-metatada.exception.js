"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidMetadataException extends Error {
    constructor(prototypeName) {
        super(`Invalid metadata exception. Metadata not found at ${prototypeName}.`);
    }
}
exports.InvalidMetadataException = InvalidMetadataException;
