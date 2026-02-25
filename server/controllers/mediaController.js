const Media = require("../models/Media");
const { cloudinary } = require("../middleware/upload");

// =======================
// GET ALL MEDIA (PUBLIC)
// =======================
exports.getAllMedia = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== "all") {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const media = await Media.find(query)
      .sort({ createdAt: -1 })
      .populate("uploadedBy", "name");

    res.status(200).json(media);
  } catch (error) {
    console.error("GET MEDIA ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =======================
// UPLOAD MEDIA (OWNER)
// =======================
exports.uploadMedia = async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const media = await Media.create({
      title: title || file.originalname,
      description: description || "",
      type: file.mimetype.startsWith("image") ? "image" : "video",
      url: file.path,
      cloudinaryId: file.filename,
      category: category || "other",
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
      size: file.size,
      uploadedBy: req.user._id,
    });

    res.status(201).json(media);
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =======================
// DELETE MEDIA (OWNER) 🔥 FIXED
// =======================
exports.deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("🗑️ DELETE REQUEST ID:", id);

    // 🔥 MUST use findById
    const media = await Media.findById(id);

    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }

    // 🔥 Delete from Cloudinary
    const resourceType = media.type === "video" ? "video" : "image";

    await cloudinary.uploader.destroy(media.cloudinaryId, {
      resource_type: resourceType,
    });

    // 🔥 Delete from MongoDB
    await media.deleteOne();

    res.status(200).json({ message: "Media deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =======================
// UPDATE MEDIA (OWNER)
// =======================
exports.updateMedia = async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;

    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }

    media.title = title || media.title;
    media.description = description || media.description;
    media.category = category || media.category;
    media.tags = tags
      ? tags.split(",").map((t) => t.trim())
      : media.tags;

    await media.save();

    res.status(200).json(media);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =======================
// LIKE MEDIA (PUBLIC)
// =======================
exports.likeMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }

    media.likes += 1;
    await media.save();

    res.status(200).json(media);
  } catch (error) {
    console.error("LIKE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};