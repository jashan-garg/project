const express = require('express');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const { auth } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Get all appointments (filtered by user role)
router.get('/', auth, async (req, res) => {
    try {
        let appointments;

        if (req.user.role === 'admin') {
            appointments = await Appointment.find()
                .populate('patient', 'name email phone')
                .populate({
                    path: 'doctor',
                    populate: { path: 'userId', select: 'name email phone' },
                })
                .sort({ appointmentDate: -1 });
        } else if (req.user.role === 'doctor') {
            const doctor = await Doctor.findOne({ userId: req.user._id });
            if (!doctor) {
                return res
                    .status(404)
                    .json({ message: 'Doctor profile not found' });
            }
            appointments = await Appointment.find({ doctor: doctor._id })
                .populate('patient', 'name email phone')
                .populate({
                    path: 'doctor',
                    populate: { path: 'userId', select: 'name email phone' },
                })
                .sort({ appointmentDate: -1 });
        } else {
            appointments = await Appointment.find({ patient: req.user._id })
                .populate({
                    path: 'doctor',
                    populate: { path: 'userId', select: 'name email phone' },
                })
                .sort({ appointmentDate: -1 });
        }

        res.json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single appointment
router.get('/:id', auth, async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate('patient', 'name email phone')
            .populate({
                path: 'doctor',
                populate: { path: 'userId', select: 'name email phone' },
            });

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Check access
        if (
            req.user.role !== 'admin' &&
            appointment.patient._id.toString() !== req.user._id.toString()
        ) {
            const doctor = await Doctor.findOne({ userId: req.user._id });
            if (
                !doctor ||
                appointment.doctor._id.toString() !== doctor._id.toString()
            ) {
                return res.status(403).json({ message: 'Access denied' });
            }
        }

        res.json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create appointment
router.post(
    '/',
    auth,
    [
        body('doctorId').notEmpty().withMessage('Doctor ID is required'),
        body('appointmentDate')
            .notEmpty()
            .withMessage('Appointment date is required'),
        body('appointmentTime')
            .notEmpty()
            .withMessage('Appointment time is required'),
        body('reason').notEmpty().withMessage('Reason is required'),
    ],
    async (req, res) => {
        try {
            if (req.user.role !== 'patient') {
                return res
                    .status(403)
                    .json({ message: 'Only patients can book appointments' });
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const {
                doctorId,
                appointmentDate,
                appointmentTime,
                reason,
                notes,
            } = req.body;

            const doctor = await Doctor.findById(doctorId);
            if (!doctor) {
                return res.status(404).json({ message: 'Doctor not found' });
            }

            // Check for conflicting appointments
            const conflictingAppointment = await Appointment.findOne({
                doctor: doctorId,
                appointmentDate: new Date(appointmentDate),
                appointmentTime,
                status: { $in: ['pending', 'confirmed'] },
            });

            if (conflictingAppointment) {
                return res
                    .status(400)
                    .json({ message: 'This time slot is already booked' });
            }

            const appointment = new Appointment({
                patient: req.user._id,
                doctor: doctorId,
                appointmentDate: new Date(appointmentDate),
                appointmentTime,
                reason,
                notes,
                status: 'pending',
            });

            await appointment.save();
            await appointment.populate('patient', 'name email phone');
            await appointment.populate({
                path: 'doctor',
                populate: { path: 'userId', select: 'name email phone' },
            });

            res.status(201).json(appointment);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// Update appointment status
router.put('/:id/status', auth, async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = [
            'pending',
            'confirmed',
            'cancelled',
            'completed',
        ];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Check permissions
        if (req.user.role === 'patient') {
            if (appointment.patient.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'Access denied' });
            }
            // Patients can only cancel
            if (status !== 'cancelled') {
                return res
                    .status(403)
                    .json({ message: 'Patients can only cancel appointments' });
            }
        } else if (req.user.role === 'doctor') {
            const doctor = await Doctor.findOne({ userId: req.user._id });
            if (
                !doctor ||
                appointment.doctor.toString() !== doctor._id.toString()
            ) {
                return res.status(403).json({ message: 'Access denied' });
            }
        }

        appointment.status = status;
        await appointment.save();
        await appointment.populate('patient', 'name email phone');
        await appointment.populate({
            path: 'doctor',
            populate: { path: 'userId', select: 'name email phone' },
        });

        res.json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete appointment
router.delete('/:id', auth, async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Only admin or the patient who created it can delete
        if (
            req.user.role !== 'admin' &&
            appointment.patient.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({ message: 'Access denied' });
        }

        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
