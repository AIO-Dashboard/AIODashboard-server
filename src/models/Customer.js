import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    maidenName: String,
    age: { type: Number, min: 0 },
    gender: { type: String, enum: ["male", "female", "other"] },
    email: { type: String, required: true, unique: true },
    phone: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // 🔑 usually hashed, not plain
    birthDate: Date,
    image: String,
    bloodGroup: String,
    height: Number,
    weight: Number,
    eyeColor: String,

    hair: {
      color: String,
      type: String,
    },

    ip: String,

    address: {
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

    macAddress: String,
    university: String,

    bank: {
      cardExpire: String,
      cardNumber: String,
      cardType: String,
      currency: String,
      iban: String,
    },

    company: {
      department: String,
      name: String,
      title: String,
      address: {
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
    },

    ein: String,
    ssn: String,
    userAgent: String,

    crypto: {
      coin: String,
      wallet: String,
      network: String,
    },

    role: {
      type: String,
      enum: ["admin", "customer", "staff"],
      default: "customer",
    },
  },
  { timestamps: true }
); // auto adds createdAt & updatedAt

export default mongoose.model("Customer", customerSchema);
