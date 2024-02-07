const numberModal = require("../modals/numberModal");

const advancedSearch = async (req, res) => {
  try {
    const { anyWare, endWith, mustContain, notContain, startWith, sum, total } =
      req.query;
    const query = {};

    if (startWith || endWith || anyWare || mustContain) {
      let startWithRegex = "";
      if (startWith) {
        const startWithValues = startWith.split(",");
        startWithRegex = startWithValues.map((val) => `^${val}`).join("|");
      }
      let endWithRegex = "";
      if (endWith) {
        const endWithValues = endWith.split(",");
        endWithRegex = endWithValues.map((val) => `${val}$`).join("|");
      }
      const regexPattern = `(${startWithRegex})[0-9]*(${endWithRegex})`;
      query.number = { $regex: regexPattern, $options: "i" };
    }

    if (anyWare || mustContain) {
      const additionalQuery = [];
      if (anyWare)
        additionalQuery.push({
          number: { $regex: `${anyWare}`, $options: "i" },
        });
      if (mustContain)
        additionalQuery.push({
          number: { $regex: `${mustContain}`, $options: "i" },
        });
      query.$and = additionalQuery;
    }

    if (notContain) {
      const notContainValues = notContain.split(",");
      query.number = {
        ...query.number,
        $not: {
          $in: notContainValues.map((val) => new RegExp(val, "i")),
        },
      };
    }

    if (total || sum) {
      const totalValues = total ? total.split(",") : [];
      const sumValues = sum ? sum.split(",") : [];

      const sumQuery = {
        $or: [
          { oneTimeSum: { $in: totalValues } },
          { secondTimeSum: { $in: totalValues.concat(sumValues) } },
          { thirdTimeSum: { $in: sumValues } },
        ],
      };

      if (query.$and) query.$and.push(sumQuery);
      else query.$and = [sumQuery];
    }

    const response = await numberModal.find(query);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

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

const filterNumbersInFancy = async (req, res) => {
  try {
    const { anyWare } = req.query;

    let query = {};

    if (anyWare) {
      query.number = { ...query.number, $regex: anyWare, $options: "i" };
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
  filterNumbersInFancy,
};
