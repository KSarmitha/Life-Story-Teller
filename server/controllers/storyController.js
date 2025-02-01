const Story = require("../models/Story");

const createStory = async (req, res) => {
  try {
    const { userId, date, content } = req.body;
    const newStory = new Story({
      userId,
      date: date || new Date(),
      content,
    });

    const savedStory = await newStory.save();
    res.status(201).json(savedStory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating story", error: error.message });
  }
};

const getStoriesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const stories = await Story.find({ userId }).sort({ date: -1 });
    res.status(200).json(stories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching stories", error: error.message });
  }
};

const updateStory = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const updatedStory = await Story.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );

    if (!updatedStory) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.status(200).json(updatedStory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating story", error: error.message });
  }
};

const deleteStory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStory = await Story.findByIdAndDelete(id);

    if (!deletedStory) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.status(200).json({ message: "Story deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting story", error: error.message });
  }
};

module.exports = {
  createStory,
  getStoriesByUserId,
  updateStory,
  deleteStory,
};
