import { useState } from "react";
import AphlaPetsSelects from "./AphlaPetsSelects";
import "./car-panel.css";
import { cn } from "@/lib/utils";

const CarPanelSelection = ({ error, setPlate }: any) => {
  const [num, setNum] = useState({
    en: ["-", "-", "-", "-"],
    ar: ["-", "-", "-", "-"],
  });
  const [word_1, setWord1] = useState("-");
  const [word_2, setWord2] = useState("-");
  const [word_3, setWord3] = useState("-");

  const handleNumChange = (e: any) => {
    setNum({
      ar: Number(e.target.value)
        .toLocaleString("ar-EG")
        .split("")
        .filter((n) => n !== "٬"),
      en: e.target.value.split(""),
    });
  };

  const en = `${num.en.join("")} ${word_1.split("-")[0]} ${word_2.split("-")[0]} ${
    word_3.split("-")[0]
  }`;
  const ar = `${word_1.split("-")[1]} ${word_2.split("-")[1]} ${
    word_3.split("-")[1]
  } ${num.ar.join("")}`;

  if (String(`${en} - ${ar}`).replaceAll("-", "").trim()) {
    setPlate(`${en} - ${ar}`);
  }

  return (
    <div className="car-panel-selection flex items-center gap-x-4 flex-wrap mb-8">
      <input type="hidden" name="plate" value={`${en} - ${ar}`} />

      <div className="ms-12" id="plate_display_wrapper" data-once="js_mod">
        <div data-drupal-selector="edit-plate-display"></div>
        <div className="plate-chars-wrapper">
          <div id="plate-chars">
            <table>
              <tbody>
                <tr>
                  <td id={`plate_1`}>
                    <span>{word_1.split("-")[1] || "-"}</span>
                  </td>
                  <td id={`plate_2`}>
                    <span>{word_2.split("-")[1] || "-"}</span>
                  </td>
                  <td id={`plate_3`}>
                    <span>{word_3.split("-")[1] || "-"}</span>
                  </td>
                  <td id="plate_4">
                    <span>{num.ar[0] ?? "-"}</span>
                    <span>{num.ar[1] ?? "-"}</span>
                    <span>{num.ar[2] ?? "-"}</span>
                    <span>{num.ar[3] ?? "-"}</span>
                  </td>
                </tr>
                <tr>
                  <td id={`en_plate_1`}>
                    <span>{word_1.split("-")[0] || "-"}</span>
                  </td>
                  <td id={`en_plate_2`}>
                    <span>{word_2.split("-")[0] || "-"}</span>
                  </td>
                  <td id={`en_plate_3`}>
                    <span>{word_3.split("-")[0] || "-"}</span>
                  </td>

                  <td id="en_plate_4">
                    <span>{num.en[3] ?? "-"}</span>
                    <span>{num.en[2] ?? "-"}</span>
                    <span>{num.en[1] ?? "-"}</span>
                    <span>{num.en[0] ?? "-"}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AphlaPetsSelects
        setWord1={setWord1}
        word1={word_1}
        setWord2={setWord2}
        word2={word_2}
        setWord3={setWord3}
        word3={word_3}
      />
      <input
        className={cn(
          "w-40 rounded-md py-3 px-2 border border-gray-300 bg-transparent text-center",
          error && "border-red-500"
        )}
        onChange={handleNumChange}
        type="tel"
        placeholder="رقم المركبة"
        maxLength={4}
        style={{ direction: "rtl" }}
        name="plate_num"
      />

      <p
        className={cn(
          "basis-full opacity-0 text-red-500 text-sm h-4 text-center",
          error ? "opacity-100" : "opacity-0"
        )}
      >
        {error}
      </p>
    </div>
  );
};
export default CarPanelSelection;
