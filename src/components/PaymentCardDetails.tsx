import { getBankLogo } from "@/lib/utils";
import { AccountBalanceOutlined } from "@mui/icons-material";

export default function PaymentCardDetails() {
  const { cardType, bankName } = JSON.parse(
    localStorage.getItem("payment") || ""
  );

  const bankLogo = bankName ? getBankLogo(bankName) : undefined;

  return (
    <div className="border-b border-gray-500 mt-3 pb-2 flex justify-between">
      <div>
        <img src={`images/${cardType}.png`} style={{ height: "15px" }} />
      </div>
      {bankName && (
        <div dir="ltr">
          {bankLogo ? (
            <img src={bankLogo} style={{ height: "35px" }} />
          ) : (
            <>
              <AccountBalanceOutlined />
              <p>{bankName}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
