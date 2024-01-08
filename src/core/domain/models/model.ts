abstract class Model {
    // Constructs an object from a JSON.
    static fromJSON(_: Record<string, unknown>): Model {
        throw new Error('you need to implement the fromJSON method');
    }
    // Constructs an object from a JSON returned by a form.
    static fromForm(_: Record<string, unknown>): Model {
        throw new Error('you need to implement the fromForm method');
    }
    // Constructs an object from a JSON returned by a form not dedicated to this class.
    static fromDerivedForm(_: Record<string, unknown>): Model {
        throw new Error('you need to implement the fromDerivedForm method');
    }
}

export default Model;