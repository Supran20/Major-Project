const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Card = require("../models/card-model"); // Import your Card model
const mongoose = require("mongoose");

//*------------------------------------------
//*User logic
//*------------------------------------------
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

//*------------------------------------------
//*User Delete logic
//*------------------------------------------
const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

//*------------------------------------------
//*Single User logic
//*------------------------------------------
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id }, { password: 0 });
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

//*------------------------------------------
//*User Update logic
//*------------------------------------------
const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;

    const updatedData = await User.updateOne(
      { _id: id },
      {
        $set: updatedUserData,
      }
    );
    return res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
};

//*------------------------------------------
//*Contacts logic
//*------------------------------------------
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    console.log(contacts);
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No Contacts Found" });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

//*------------------------------------------
//*Contact Delete logic
//*------------------------------------------
const deleteContactById = async (req, res) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    return res.status(200).json({ message: "Contact deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

//*------------------------------------------
//*View Glass logic
//*------------------------------------------
const getSalesData = async (req, res, next) => {
  try {
    const { glassName } = req.params;

    // Access the collection dynamically based on glassName
    const collection = mongoose.connection.db.collection(glassName);

    // Fetch the data from the collection and convert it to an array
    const salesCursor = collection.find();
    const sales = await salesCursor.toArray(); // Converts the cursor to an array

    if (!sales || sales.length === 0) {
      return res.status(404).json({ message: "No Sales Found" });
    }

    // Send the sales data as response
    return res.status(200).json(sales);
  } catch (error) {
    console.error(`Error querying sales data: ${error.message}`);
    next(error);
  }
};
module.exports = {
  getAllUsers,
  getAllContacts,
  deleteUserById,
  getUserById,
  updateUserById,
  deleteContactById,
  getSalesData,
};
