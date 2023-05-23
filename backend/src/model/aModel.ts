import {model, Schema, Document} from 'mongoose';

// Single line comment

/**
 * @typedef AType
 * @property {string} id.required
 * @property {string} field1
 * @property {number} field2
 * @property {string} field3 - This is a date field - eg: 2020-01-01T00:00:00.000Z
 * @property {boolean} field4
 */

interface aInteface extends Document {
    id: string;
    field1: string;
    field2: number;
    field3: Date;
    field4: boolean;
}

const aSchema = new Schema<aInteface>({
    id: {type: String, required: true, unique: true},
    field1: {type: String, required: false},
    field2: {type: Number, required: false},
    field3: {type: Date, required: false},
    field4: {type: Boolean, required: false}
});

export default model<aInteface>('aModel', aSchema);