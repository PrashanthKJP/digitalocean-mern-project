const orderModal = require("../modals/olderModal");

const createOrder = async (req, res) => {
  try {
    const { name, numbers, phoneNumber } = req.body;
    const newOrder = new orderModal({ name, numbers, phoneNumber });
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).send({ message: "something went wrong" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModal.find();
    res.status(201).json(orders);
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
};

const getSingleOrder = async (req, res) => {
  const orderId = req.params.id;
  try {
    const currentOrder = await orderModal.findOne({ _id: orderId });
    res.send(currentOrder);
  } catch (error) {
    res.json({ message: "something went wrong" });
  }
};

const deleteSingleOrder = async (req, res) => {
  const deleteOrderId = req.params.id;

  try {
    const currentItem = await orderModal.findByIdAndDelete({
      _id: deleteOrderId,
    });

    res.status(200).send(currentItem);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  deleteSingleOrder,
  createOrder,
};
