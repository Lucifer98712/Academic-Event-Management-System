const Event = require("../../../models/users.model");

const deleteUser = async (req, res) => {
  const { id } = req.body;

  try {
    const deletedUser = await Event.findByIdAndDelete(id);
    if (!deletedUser) throw new Error("User not found!");

    res.status(200).json({
      status: "success",
      message: "User deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

module.exports = deleteUser;
