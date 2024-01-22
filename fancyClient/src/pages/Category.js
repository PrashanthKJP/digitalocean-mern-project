import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const Category = ({ getCategoryFunction }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleCheckboxChange = (type) => {
    setSelectedOption(type);
  };
  useEffect(() => {
    getCategoryFunction(selectedOption);
  }, [selectedOption]);
  return (
    <>
      <Form
        style={{
          marginTop: "5px",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Form.Label
          style={{
            fontWeight: "600",
            fontStyle: "italic",
            fontSize: "18px",
            marginBottom: "15px",
          }}
        >
          Category
        </Form.Label>
        <Form.Check
          type="checkbox"
          id="check-api-WITHOUT 2,4 & 8"
          label="WITHOUT 2,4 & 8"
          checked={selectedOption === "WITHOUT 2,4 & 8"}
          onChange={() => handleCheckboxChange("WITHOUT 2,4 & 8")}
          value={selectedOption}
        />
        <Form.Check
          type="checkbox"
          id="check-api-HIGH RANGE NUMBER"
          label="HIGH RANGE NUMBER"
          checked={selectedOption === "HIGH RANGE NUMBER"}
          onChange={() => handleCheckboxChange("HIGH RANGE NUMBER")}
          value={selectedOption}
        />
        <Form.Check
          type="checkbox"
          id="check-api-MIRROR NUMBER"
          label="MIRROR NUMBER"
          checked={selectedOption === "MIRROR NUMBER"}
          onChange={() => handleCheckboxChange("MIRROR NUMBER")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-SEMI-MIRROR NUMBER"
          label="SEMI-MIRROR NUMBER"
          checked={selectedOption === "SEMI-MIRROR NUMBER"}
          onChange={() => handleCheckboxChange("SEMI-MIRROR NUMBER")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-XY-XY-XY-XY"
          label="XY-XY-XY-XY"
          checked={selectedOption === "XY-XY-XY-XY"}
          onChange={() => handleCheckboxChange("XY-XY-XY-XY")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-SYMMETRY NUMBER"
          label="SYMMETRY NUMBER"
          checked={selectedOption === "SYMMETRY NUMBER"}
          onChange={() => handleCheckboxChange("SYMMETRY NUMBER")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-FANCY NUMBER"
          label="FANCY NUMBER"
          checked={selectedOption === "FANCY NUMBER"}
          onChange={() => handleCheckboxChange("FANCY NUMBER")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-LOW COST NUMBERS"
          label="LOW COST NUMBERS"
          checked={selectedOption === "LOW COST NUMBERS"}
          onChange={() => handleCheckboxChange("LOW COST NUMBERS")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-DOUBLING NUMBER"
          label="DOUBLING NUMBER"
          checked={selectedOption === "DOUBLING NUMBER"}
          onChange={() => handleCheckboxChange("DOUBLING NUMBER")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-ENDING XY-XY-XY"
          label="ENDING XY-XY-XY"
          checked={selectedOption === "ENDING XY-XY-XY"}
          onChange={() => handleCheckboxChange("ENDING XY-XY-XY")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-MIDDLE XY-XY-XY"
          label="MIDDLE XY-XY-XY"
          checked={selectedOption === "MIDDLE XY-XY-XY"}
          onChange={() => handleCheckboxChange("MIDDLE XY-XY-XY")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-STARTING XY-XY-XY"
          label="STARTING XY-XY-XY"
          checked={selectedOption === "STARTING XY-XY-XY"}
          onChange={() => handleCheckboxChange("STARTING XY-XY-XY")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-ABCD-XY-ABCD"
          label="ABCD-XY-ABCD"
          checked={selectedOption === "ABCD-XY-ABCD"}
          onChange={() => handleCheckboxChange("ABCD-XY-ABCD")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-COUNTING NUMBER"
          label="COUNTING NUMBER"
          checked={selectedOption === "COUNTING NUMBER"}
          onChange={() => handleCheckboxChange("COUNTING NUMBER")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-STARTING XYZ-XYZ"
          label="STARTING XYZ-XYZ"
          checked={selectedOption === "STARTING XYZ-XYZ"}
          onChange={() => handleCheckboxChange("STARTING XYZ-XYZ")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-ENDING XYZ-XYZ"
          label="ENDING XYZ-XYZ"
          checked={selectedOption === "ENDING XYZ-XYZ"}
          onChange={() => handleCheckboxChange("ENDING XYZ-XYZ")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-SPECIAL DIGIT NUMBER"
          label="SPECIAL DIGIT NUMBER"
          checked={selectedOption === "SPECIAL DIGIT NUMBER"}
          onChange={() => handleCheckboxChange("SPECIAL DIGIT NUMBER")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-XY-XY"
          label="XY-XY"
          checked={selectedOption === "XY-XY"}
          onChange={() => handleCheckboxChange("XY-XY")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-XYXY-ABAB"
          label="XYXY-ABAB"
          checked={selectedOption === "XYXY-ABAB"}
          onChange={() => handleCheckboxChange("XYXY-ABAB")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-3 DIGIT NUMBER"
          label="3 DIGIT NUMBER"
          checked={selectedOption === "3 DIGIT NUMBER"}
          onChange={() => handleCheckboxChange("3 DIGIT NUMBER")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-2 DIGIT NUMBER"
          label="2 DIGIT NUMBER"
          checked={selectedOption === "2 DIGIT NUMBER"}
          onChange={() => handleCheckboxChange("2 DIGIT NUMBER")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-XXX-YYY"
          label="XXX-YYY"
          checked={selectedOption === "XXX-YYY"}
          onChange={() => handleCheckboxChange("XXX-YYY")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-ABCD-ABCD"
          label="ABCD-ABCD"
          checked={selectedOption === "ABCD-ABCD"}
          onChange={() => handleCheckboxChange("ABCD-ABCD")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-786 SPECIAL"
          label="786 SPECIAL"
          checked={selectedOption === "786 SPECIAL"}
          onChange={() => handleCheckboxChange("786 SPECIAL")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-00X00 & 00XY00"
          label="00X00 & 00XY00"
          checked={selectedOption === "00X00 & 00XY00"}
          onChange={() => handleCheckboxChange("00X00 & 00XY00")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-ENDING HEXA"
          label="ENDING HEXA"
          checked={selectedOption === "ENDING HEXA"}
          onChange={() => handleCheckboxChange("ENDING HEXA")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-MIDDLE HEXA"
          label="MIDDLE HEXA"
          checked={selectedOption === "MIDDLE HEXA"}
          onChange={() => handleCheckboxChange("MIDDLE HEXA")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-ENDING PENTA"
          label="ENDING PENTA"
          checked={selectedOption === "ENDING PENTA"}
          onChange={() => handleCheckboxChange("ENDING PENTA")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-MIDDLE PENTA"
          label="MIDDLE PENTA"
          checked={selectedOption === "MIDDLE PENTA"}
          onChange={() => handleCheckboxChange("MIDDLE PENTA")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-ENDING TETRA"
          label="ENDING TETRA"
          checked={selectedOption === "ENDING TETRA"}
          onChange={() => handleCheckboxChange("ENDING TETRA")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-MIDDLE TETRA"
          label="MIDDLE TETRA"
          checked={selectedOption === "MIDDLE TETRA"}
          onChange={() => handleCheckboxChange("MIDDLE TETRA")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-ENDING XXX"
          label="ENDING XXX"
          checked={selectedOption === "ENDING XXX"}
          onChange={() => handleCheckboxChange("ENDING XXX")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-000000 NUMBERS"
          label="000000 NUMBERS"
          checked={selectedOption === "000000 NUMBERS"}
          onChange={() => handleCheckboxChange("000000 NUMBERS")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-00000 NUMBERS"
          label="00000 NUMBERS"
          checked={selectedOption === "00000 NUMBERS"}
          onChange={() => handleCheckboxChange("00000 NUMBERS")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-ENDING 0000"
          label="ENDING 0000"
          checked={selectedOption === "ENDING 0000"}
          onChange={() => handleCheckboxChange("ENDING 0000")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-ENDING 0000X"
          label="ENDING 0000X"
          checked={selectedOption === "ENDING 0000X"}
          onChange={() => handleCheckboxChange("ENDING 0000X")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-ENDING 0000XY"
          label="ENDING 0000XY"
          checked={selectedOption === "ENDING 0000XY"}
          onChange={() => handleCheckboxChange("ENDING 0000XY")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-MIDDLE 0000"
          label="MIDDLE 0000"
          checked={selectedOption === "MIDDLE 0000"}
          onChange={() => handleCheckboxChange("MIDDLE 0000")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-ENDING 000"
          label="ENDING 000"
          checked={selectedOption === "ENDING 000"}
          onChange={() => handleCheckboxChange("ENDING 000")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-ENDING 000X"
          label="ENDING 000X"
          checked={selectedOption === "ENDING 000X"}
          onChange={() => handleCheckboxChange("ENDING 000X")}
        />
        <Form.Check
          type="checkbox"
          id="check-api-ENDING 000XY"
          label="ENDING 000XY"
          checked={selectedOption === "ENDING 000XY"}
          onChange={() => handleCheckboxChange("ENDING 000XY")}
        />
      </Form>
    </>
  );
};

export default Category;
