import mongoose, {Schema, Document, ObjectId} from "mongoose";

export interface IOrderItem{
    productTitle: string,
    productImage: string,
    unitPrice: number,
    quantity: number
}

export interface IOrder extends Document{
    orderItems: IOrderItem[],
    total: number,
    address: string,
    userID: ObjectId | string;
}

const OrderItemSchema = new Schema<IOrderItem>({
    productTitle: {type: String, require: true},
    productImage: {type: String, require: true},
    unitPrice: {type: Number, require: true},
    quantity: {type: Number, require: true},
});

const OrderSchema = new Schema<IOrder>({
    orderItems: [OrderItemSchema],
    total: {type: Number, required: true},
    address: {type: String, required: true},
    userID: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

export const orderModel = mongoose.model<IOrder>("Order", OrderSchema);