const taskModel = require("../models/schema");

const postTask = async (req, res) => {
  try {
    const { title, description, status, dueDate, createdAt } = req.body;
    await taskModel.create({
      title,
      description,
      status,
      dueDate,
      createdAt,
    });

    res.redirect("/user/api/tasks");
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Invalid data",
    });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await taskModel.find();
    if (!task) throw new Error("Cannot find data");

    await res.status(200).send(task);
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Invalid data",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskDelete = await taskModel.findByIdAndDelete(req.params.id);

    if (!taskDelete) return res.status(404).json({ message: "Not found data" });

    res.status(200).json({ message: "delete successfully", taskDelete });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Invalid data",
    });
  }
};

const editTask = async (req, res) => {
  try{

    const {title, description, status, dueDate, createdAt} = req.body
    const taskEdit = await taskModel.findByIdAndUpdate(req.params.id, {title, description, status, dueDate, createdAt},{
      new: true, runValidators: true
    })

    if(!taskEdit) return res.status(404).json({
      message: "Cannot update"
    })

    res.status(200).json({
      message: "Update Successfully",
      taskEdit
    })

  }
  catch(error){
    res.status(400).json({
      error: error.message,
      message: "Invalid data"
    })
  }
}

module.exports = {
  postTask,
  getTask,
  deleteTask,
  editTask,
};
