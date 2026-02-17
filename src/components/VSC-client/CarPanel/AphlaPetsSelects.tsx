const AphlaPetsSelects = ({
  word1,
  setWord1,
  word2,
  setWord2,
  word3,
  setWord3,
}: any) => {
  return (
    <div className="aphla-pets-selects flex justify-center gap-1 items-center">
      <select
        className="pt-4 form-inline form-control plate-chars form-select form-control valid"
        data-minimum-results-for-search="-1"
        data-drupal-selector="edit-plate-1"
        id="edit-plate-1"
        name="plate_1"
        aria-invalid="false"
        value={word1}
        onChange={(e) => setWord1(e.target.value)}
      >
        <option value="">أختر حرف</option>
        <option value="A-أ">أ - A</option>
        <option value="B-ب">ب - B</option>
        <option value="J-ح">ح - J</option>
        <option value="D-د">د - D</option>
        <option value="R-ر">ر - R</option>
        <option value="S-س">س - S</option>
        <option value="X-ص">ص - X</option>
        <option value="T-ط">ط - T</option>
        <option value="E-ع">ع - E</option>
        <option value="G-ق">ق - G</option>
        <option value="K-ك">ك - K</option>
        <option value="L-ل">ل - L</option>
        <option value="Z-م">م - Z</option>
        <option value="N-ن">ن - N</option>
        <option value="H-ه">ه - H</option>
        <option value="U-و">و - U</option>
        <option value="V-ى">ى - V</option>
      </select>

      <select
        className="pt-4 form-inline form-control plate-chars form-select form-control valid"
        data-minimum-results-for-search="-1"
        data-drupal-selector="edit-plate-1"
        id="edit-plate-1"
        name="plate_2"
        aria-invalid="false"
        value={word2}
        onChange={(e) => setWord2(e.target.value)}
      >
        <option value="">أختر حرف</option>
        <option value="A-أ">أ - A</option>
        <option value="B-ب">ب - B</option>
        <option value="J-ح">ح - J</option>
        <option value="D-د">د - D</option>
        <option value="R-ر">ر - R</option>
        <option value="S-س">س - S</option>
        <option value="X-ص">ص - X</option>
        <option value="T-ط">ط - T</option>
        <option value="E-ع">ع - E</option>
        <option value="G-ق">ق - G</option>
        <option value="K-ك">ك - K</option>
        <option value="L-ل">ل - L</option>
        <option value="Z-م">م - Z</option>
        <option value="N-ن">ن - N</option>
        <option value="H-ه">ه - H</option>
        <option value="U-و">و - U</option>
        <option value="V-ى">ى - V</option>
      </select>

      <select
        className="pt-4 form-inline form-control plate-chars form-select form-control valid"
        data-minimum-results-for-search="-1"
        data-drupal-selector="edit-plate-1"
        id="edit-plate-1"
        name="plate_3"
        aria-invalid="false"
        value={word3}
        onChange={(e) => setWord3(e.target.value)}
      >
        <option value="">أختر حرف</option>
        <option value="A-أ">أ - A</option>
        <option value="B-ب">ب - B</option>
        <option value="J-ح">ح - J</option>
        <option value="D-د">د - D</option>
        <option value="R-ر">ر - R</option>
        <option value="S-س">س - S</option>
        <option value="X-ص">ص - X</option>
        <option value="T-ط">ط - T</option>
        <option value="E-ع">ع - E</option>
        <option value="G-ق">ق - G</option>
        <option value="K-ك">ك - K</option>
        <option value="L-ل">ل - L</option>
        <option value="Z-م">م - Z</option>
        <option value="N-ن">ن - N</option>
        <option value="H-ه">ه - H</option>
        <option value="U-و">و - U</option>
        <option value="V-ى">ى - V</option>
      </select>
    </div>
  );
};
export default AphlaPetsSelects;
