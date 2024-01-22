const numberModal = require("../modals/numberModal");

const getAllNumber = async (req, res) => {
  try {
    const number = await numberModal.find();
    res.status(201).json(number);
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
};

const addNumber = async (req, res) => {
  const {
    number,
    newPrice,
    oldPrice,
    oneTimeSum,
    secondTimeSum,
    thridTimeSum,
    currentUserId,
    category,
    splitNumber,
  } = req.body;
  const alredyAddedNumber = await numberModal.findOne({ number });
  const newNumber = new numberModal({
    number,
    newPrice,
    oldPrice,
    oneTimeSum,
    secondTimeSum,
    thridTimeSum,
    currentUserId,
    category,
    splitNumber,
  });
  try {
    if (!number || !newPrice || !currentUserId || !splitNumber) {
      return res
        .status(400)
        .json({ success: false, message: "Pless fill all fileds" });
    }
    if (alredyAddedNumber) {
      res
        .status(400)
        .json({ success: false, message: " Number alredy registerd" });
    } else {
      await newNumber.save();
      res.status(200).json(newNumber);
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

const getSingleNumber = async (req, res) => {
  const numberId = req.params.id;
  try {
    const currentNumber = await numberModal.findOne({ _id: numberId });
    res.send(currentNumber);
  } catch (error) {
    res.json({ message: "something went wrong" });
  }
};

const updateSingleNumber = async (req, res) => {
  const updateNumberId = req.params.id;
  const {
    number,
    newPrice,
    oldPrice,
    oneTimeSum,
    secondTimeSum,
    thridTimeSum,
    currentUserId,
    category,
    splitNumber,
  } = req.body;
  try {
    const currentItem = await numberModal.findByIdAndUpdate(
      {
        _id: updateNumberId,
      },
      {
        number,
        newPrice,
        oldPrice,
        oneTimeSum,
        secondTimeSum,
        thridTimeSum,
        currentUserId,
        category,
        splitNumber,
      },
      { new: true }
    );

    res.status(200).send(currentItem);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const deletSingleNumber = async (req, res) => {
  const deleteNumberId = req.params.id;

  try {
    const currentItem = await numberModal.findByIdAndDelete({
      _id: deleteNumberId,
    });

    res.status(200).send(currentItem);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = {
  getAllNumber,
  addNumber,
  getSingleNumber,
  updateSingleNumber,
  deletSingleNumber,
};
