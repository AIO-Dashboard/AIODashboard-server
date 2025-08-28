import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    address: String,
    city: String,
    state: String,
    stateCode: String,
    postalCode: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
    country: String,
  },
  { _id: false }
);

const statusHistorySchema = new mongoose.Schema(
  {
    status: String,
    timestamp: Date,
  },
  { _id: false }
);

const itemSchema = new mongoose.Schema(
  {
    productId: Number,
    sku: String,
    title: String,
    category: String,
    thumbnail: String,
    quantity: Number,
    unitPrice: Number,
    totalPrice: Number,
    returnEligible: Boolean,
    reviewed: Boolean,
  },
  { _id: false }
);

const discountSchema = new mongoose.Schema(
  {
    code: String,
    amount: Number,
    type: { type: String }, // e.g. percentage, fixed
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    status: { type: String, default: "Processing" },
    statusHistory: [statusHistorySchema],

    customer: {
      id: Number, // Todo: fix the customer id fields in the order objects uploaded (still pointing to id instead of _id))
      name: String,
      email: String,
      address: addressSchema,
      phone: String,
      role: { type: String, enum: ["user", "admin"], default: "user" },
    },

    shippingAddress: addressSchema,
    billingAddress: addressSchema,

    items: [itemSchema],

    totalAmount: Number,
    taxAmount: Number,
    shippingCost: Number,
    discounts: [discountSchema],

    paymentMethod: String,
    paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"] },
    transactionId: String,
    currency: { type: String, default: "USD" },

    carrier: String,
    trackingNumber: String,
    estimatedDelivery: Date,
    deliveredAt: Date,

    gift: Boolean,
    giftMessage: String,

    riskScore: Number,
    manualReview: Boolean,

    notes: String,
    attachments: [String], // array of URLs
  },
  { timestamps: true } // auto-manages createdAt & updatedAt
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
