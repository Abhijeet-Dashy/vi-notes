import { Note } from "../models/note.model.js";

export const saveNote = async (req, res) => {
  try {
    const { _id, title, content } = req.body;
    const userId = req.user._id;

    let note;

    if (_id) {
      note = await Note.findOne({ _id, owner: userId });
      if (note) {
        note.title = title !== undefined ? title : note.title;
        note.content = content !== undefined ? content : note.content;
        await note.save();
      } else {
        return res.status(404).json({ success: false, message: "Note not found or unauthorized" });
      }
    } else {
      note = await Note.create({
        title: title || "",
        content: content || "",
        owner: userId,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note saved successfully",
      note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to save note",
      error: error.message,
    });
  }
};
