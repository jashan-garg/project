const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        specialization: {
            type: String,
            required: true,
            trim: true,
        },
        experience: {
            type: Number,
            required: true,
        },
        qualifications: {
            type: String,
            required: true,
        },
        consultationFee: {
            type: Number,
            required: true,
        },
        availability: {
            monday: { available: Boolean, startTime: String, endTime: String },
            tuesday: { available: Boolean, startTime: String, endTime: String },
            wednesday: {
                available: Boolean,
                startTime: String,
                endTime: String,
            },
            thursday: {
                available: Boolean,
                startTime: String,
                endTime: String,
            },
            friday: { available: Boolean, startTime: String, endTime: String },
            saturday: {
                available: Boolean,
                startTime: String,
                endTime: String,
            },
            sunday: { available: Boolean, startTime: String, endTime: String },
        },
        bio: {
            type: String,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Doctor', doctorSchema);
