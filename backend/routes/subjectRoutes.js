const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");
const { protect, admin } = require("../middleware/authMiddleware");

// @desc    Get all subjects
// @route   GET /api/subjects
// @access  Public
router.get("/", async (req, res) => {
  try {
    const subjects = await Subject.find({}).sort({ order: 1 });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get subject by ID
// @route   GET /api/subjects/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (subject) {
      res.json(subject);
    } else {
      res.status(404).json({ message: "Subject not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a subject
// @route   POST /api/subjects
// @access  Private/Admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const { name, title, path, icon, color, order } = req.body;
    const subject = new Subject({
      name,
      title,
      path,
      icon,
      color,
      order,
    });
    const createdSubject = await subject.save();
    res.status(201).json(createdSubject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update a subject
// @route   PUT /api/subjects/:id
// @access  Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const { name, title, path, icon, color, order } = req.body;
    const subject = await Subject.findById(req.params.id);

    if (subject) {
      subject.name = name || subject.name;
      subject.title = title || subject.title;
      subject.path = path || subject.path;
      subject.icon = icon || subject.icon;
      subject.color = color || subject.color;
      subject.order = order !== undefined ? order : subject.order;

      const updatedSubject = await subject.save();
      res.json(updatedSubject);
    } else {
      res.status(404).json({ message: "Subject not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a subject
// @route   DELETE /api/subjects/:id
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);

    if (subject) {
      await subject.deleteOne();
      res.json({ message: "Subject removed" });
    } else {
      res.status(404).json({ message: "Subject not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
