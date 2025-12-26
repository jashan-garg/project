const express = require('express');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get all doctors
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find({ status: 'active' })
            .populate('userId', 'name email phone')
            .select('-__v');
        res.json(doctors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single doctor
router.get('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).populate(
            'userId',
            'name email phone'
        );
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(doctor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create doctor profile (for doctors)
router.post('/', auth, async (req, res) => {
    try {
        if (req.user.role !== 'doctor') {
            return res
                .status(403)
                .json({ message: 'Only doctors can create doctor profiles' });
        }

        // Check if doctor profile already exists
        const existingDoctor = await Doctor.findOne({ userId: req.user._id });
        if (existingDoctor) {
            return res
                .status(400)
                .json({ message: 'Doctor profile already exists' });
        }

        const doctor = new Doctor({
            userId: req.user._id,
            ...req.body,
        });

        await doctor.save();
        await doctor.populate('userId', 'name email phone');
        res.status(201).json(doctor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update doctor profile
router.put('/:id', auth, async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Check if user owns this profile or is admin
        if (
            doctor.userId.toString() !== req.user._id.toString() &&
            req.user.role !== 'admin'
        ) {
            return res.status(403).json({ message: 'Access denied' });
        }

        Object.assign(doctor, req.body);
        await doctor.save();
        await doctor.populate('userId', 'name email phone');
        res.json(doctor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
