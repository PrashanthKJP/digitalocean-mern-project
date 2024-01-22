const numberModal = require("../modals/numberModal");

const advancedSearch = async (req, res) => {
  try {
    const { anyWare, endWith, mustContain, notContain, startWith, sum, total } =
      req.query;

    let query = {};

    if (startWith) {
      query.number = {
        ...query.number,
        $regex: `^${startWith}`,
        $options: "i",
      };
    }

    if (endWith) {
      query.number = { ...query.number, $regex: `${endWith}$`, $options: "i" };
    }

    if (anyWare) {
      query.number = { ...query.number, $regex: anyWare, $options: "i" };
    }

    if (mustContain) {
      query.number = { ...query.number, $regex: mustContain, $options: "i" };
    }

    if (notContain) {
      query.number = {
        ...query.number,
        $not: { $regex: notContain, $options: "i" },
      };
    }

    if (total || sum) {
      query = {
        $or: [
          { oneTimeSum: { $in: total } },
          { secondTimeSum: { $in: total || sum } },
          { thridTimeSum: { $in: total || sum } },
        ],
      };
    }

    const response = await numberModal.find(query);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

// const advancedSearch = async (req, res) => {
//   try {
//     const { anyWare, endWith, mustContain, notContain, startWith, sum, total } =
//       req.query;

//     const response = await numberModal.find(query);
//     console.log(query);

//     res.status(200).json(response);
//   } catch (error) {
//     res.status(500).json({ message: "something went wrong" });
//     console.log(error);
//   }
// };

const filterNumbers = async (req, res) => {
  try {
    const {
      startWith,
      endWith,
      anyWare,
      mustContain,
      notContain,
      oneTimeSum,
      secondTimeSum,
      thridTimeSum,
      startPrice,
      endPrice,
      category,
    } = req.query;

    let query = {};

    if (startWith) {
      query.number = {
        ...query.number,
        $regex: `^${startWith}`,
        $options: "i",
      };
    }

    if (endWith) {
      query.number = { ...query.number, $regex: `${endWith}$`, $options: "i" };
    }

    if (anyWare) {
      query.number = { ...query.number, $regex: anyWare, $options: "i" };
    }

    if (mustContain) {
      query.number = { ...query.number, $regex: mustContain, $options: "i" };
    }

    if (notContain) {
      query.number = {
        ...query.number,
        $not: { $regex: notContain, $options: "i" },
      };
    }

    if (oneTimeSum) {
      query.oneTimeSum = { $in: oneTimeSum };
    }
    if (secondTimeSum) {
      query.secondTimeSum = { $in: secondTimeSum };
    }

    if (thridTimeSum) {
      query.thridTimeSum = { $in: thridTimeSum };
    }

    if (startPrice && endPrice) {
      query.$and = [
        { newPrice: { $gte: startPrice } },
        { newPrice: { $lte: endPrice } },
      ];
    }

    if (category) {
      query.category = { $in: category };
    }

    const response = await numberModal.find(query);

    if (response.length < 1) {
      return res.status(200).json({ message: "No Data" });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

module.exports = {
  advancedSearch,
  filterNumbers,
};
