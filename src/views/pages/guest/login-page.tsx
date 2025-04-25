import AnimUserIcon from "@/components/custom-ui/icons/AnimUserIcon";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="px-6 sm:px-16 pb-16 flex flex-col items-center h-screen pt-12">
      <div className="bg-red-500 shadow-primary-box-shadow bg-tertiary w-fit rounded-full p-4">
        <AnimUserIcon />
      </div>
      <h1 className="drop-shadow-lg text-center relative text-tertiary uppercase text-[34px] mb-8 font-bold">
        {t("welcome")}
      </h1>
      <h1
        onClick={() => navigate("/auth/finance/login")}
        className="border py-4 px-5 rounded-md bg-primary/5 shadow hover:shadow-sm rtl:text-xl-rtl"
      >
        {t("are_a_finance")}

        <span className="text-fourth cursor-pointer hover:opacity-70 rtl:text-xl-rtl font-bold ">
          {` ${t("click_here")}`}
        </span>
      </h1>
      <h1
        onClick={() => navigate("/auth/epi/login")}
        className="border py-4 px-5 rounded-md bg-primary/5 mt-4 shadow hover:shadow-sm rtl:text-xl-rtl"
      >
        {t("are_a_epi")}

        <span className="text-fourth cursor-pointer hover:opacity-70 rtl:text-xl-rtl font-bold">
          {` ${t("click_here")}`}
        </span>
      </h1>
    </div>
  );
}
