import CustomInput from "@/components/custom-ui/input/CustomInput";
import { RefreshCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import PrimaryButton from "@/components/custom-ui/button/PrimaryButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { UserInformation, UserPassword } from "@/lib/types";
import axiosClient from "@/lib/axois-client";
import { useGeneralAuthState } from "@/context/AuthContextProvider";
import { ChecklistEnum, PermissionEnum, TaskTypeEnum } from "@/lib/constants";
import { setServerError, validate } from "@/validation/validation";
import NastranSpinner from "@/components/custom-ui/spinner/NastranSpinner";
import ButtonSpinner from "@/components/custom-ui/spinner/ButtonSpinner";
import { UserPermission } from "@/database/tables";
import { ValidateItem } from "@/validation/types";
import CheckListChooser from "@/components/custom-ui/chooser/CheckListChooser";
import { getConfiguration, validateFile } from "@/lib/utils";
export interface EditUserPasswordProps {
  id: string | undefined;
  refreshPage: () => Promise<void>;
  userData: UserInformation | undefined;
  failed: boolean;
  permissions: UserPermission;
}

export function EditUserPassword(props: EditUserPasswordProps) {
  const { id, userData, failed, refreshPage, permissions } = props;
  const { user } = useGeneralAuthState();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  // const [isVisible, setIsVisible] = useState(false);

  const [passwordData, setPasswordData] = useState<UserPassword>({
    new_password: "",
    confirm_password: "",
    old_password: "",
    letter_of_pass_change: undefined,
  });
  const [error, setError] = useState<Map<string, string>>(new Map());

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };
  const saveData = async () => {
    if (id != undefined) {
      setLoading(true);
      // 1. Validate form
      const rules: ValidateItem[] = [
        {
          name: "new_password",
          rules: ["required", "min:8", "max:45"],
        },
        {
          name: "confirm_password",
          rules: ["required", "min:8", "max:45"],
        },
        {
          name: "letter_of_pass_change",
          rules: ["required"],
        },
      ];
      // if (user.role.role != RoleEnum.super) {
      //   rules.push({
      //     name: "old_password",
      //     rules: ["required", "min:8", "max:45"],
      //   });
      // }
      const passed = await validate(rules, passwordData, setError);
      if (!passed) {
        setLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append("id", id);
      formData.append("new_password", passwordData.new_password);
      // if (user.role.role != RoleEnum.super)
      //   formData.append("old_password", passwordData.old_password);
      formData.append("confirm_password", passwordData.confirm_password);
      try {
        const response = await axiosClient.post(authData.submitUrl, formData);
        if (response.status == 200) {
          toast({
            toastType: "SUCCESS",
            title: t("success"),
            description: t(response.data.message),
          });
        }
      } catch (error: any) {
        toast({
          toastType: "ERROR",
          title: t("error"),
          description: error.response.data.message,
        });
        setServerError(error.response.data.errors, setError);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const hasEdit = permissions.sub.get(
    PermissionEnum.users.sub.user_information
  )?.edit;
  const authData = useMemo(() => {
    const isFinance = user.role.name.startsWith("finance");

    return {
      checklist_id: isFinance
        ? ChecklistEnum.finance_letter_of_password_change
        : ChecklistEnum.epi_letter_of_password_change,
      task_type: isFinance ? TaskTypeEnum.finance : TaskTypeEnum.epi,
      unique_identifier: isFinance
        ? ChecklistEnum.finance_letter_of_password_change
        : ChecklistEnum.epi_letter_of_password_change,
      submitUrl: isFinance
        ? "finance/user/change/account/password"
        : "epi/user/change/account/password",
    };
  }, [user.role.name]);
  return (
    <Card>
      <CardHeader className="space-y-0">
        <CardTitle className="rtl:text-3xl-rtl ltr:text-2xl-ltr">
          {t("update_account_password")}
        </CardTitle>
        <CardDescription className="rtl:text-xl-rtl ltr:text-lg-ltr">
          {t("update_pass_descrip")}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 w-full lg:w-[70%] 2xl:w-1/2">
        {failed ? (
          <h1>{t("u_are_not_authzed!")}</h1>
        ) : !userData ? (
          <NastranSpinner />
        ) : (
          <>
            <CustomInput
              size_="sm"
              name="new_password"
              lable={t("new_password")}
              required={true}
              requiredHint={`* ${t("required")}`}
              defaultValue={passwordData["new_password"]}
              onChange={handleChange}
              placeholder={t("enter_password")}
              errorMessage={error.get("new_password")}
              type={"password"}
            />
            <CustomInput
              size_="sm"
              name="confirm_password"
              lable={t("confirm_password")}
              required={true}
              requiredHint={`* ${t("required")}`}
              defaultValue={passwordData["confirm_password"]}
              onChange={handleChange}
              placeholder={t("enter_password")}
              errorMessage={error.get("confirm_password")}
              type={"password"}
            />
            <div>
              <CheckListChooser
                className=" border rounded-md p-2"
                number={undefined}
                hasEdit={true}
                url={`${import.meta.env.VITE_API_BASE_URL}/api/v1/file/upload`}
                headers={{
                  Authorization: "Bearer " + getConfiguration()?.token,
                }}
                name={t("letter_of_pass_change")}
                defaultFile={passwordData?.letter_of_pass_change}
                uploadParam={{
                  checklist_id: authData.checklist_id,
                  task_type: authData.task_type,
                  unique_identifier: authData.unique_identifier,
                }}
                accept={"application/pdf,image/jpeg,image/png,image/jpg"}
                onComplete={async (record: any) => {
                  for (const element of record) {
                    const checklist = element[element.length - 1];
                    setPasswordData({
                      ...passwordData,
                      letter_of_pass_change: checklist,
                    });
                  }
                }}
                onFailed={async (failed: boolean, response: any) => {
                  if (failed) {
                    if (response) {
                      toast({
                        toastType: "ERROR",
                        description: response.data.message,
                      });
                      setPasswordData({
                        ...passwordData,
                        letter_of_pass_change: undefined,
                      });
                    }
                  }
                }}
                onStart={async (_file: File) => {}}
                validateBeforeUpload={function (file: File): boolean {
                  const maxFileSize = 3 * 1024 * 1024; // 3MB
                  const resultFile = validateFile(
                    file,
                    Math.round(maxFileSize),
                    ["application/pdf", "image/jpeg", "image/png", "image/jpg"],
                    t
                  );
                  return resultFile ? true : false;
                }}
              />
              {error.get("letter_of_pass_change") && (
                <h1 className="rtl:text-md-rtl ltr:text-sm-ltr px-2 capitalize text-start text-red-400">
                  {error.get("letter_of_pass_change")}
                </h1>
              )}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        {failed ? (
          <PrimaryButton
            onClick={async () => await refreshPage()}
            className="bg-red-500 hover:bg-red-500/70"
          >
            {t("failed_retry")}
            <RefreshCcw className="ltr:ml-2 rtl:mr-2" />
          </PrimaryButton>
        ) : (
          userData &&
          hasEdit && (
            <PrimaryButton
              disabled={loading}
              onClick={async () => {
                await saveData();
              }}
              className={`shadow-lg`}
            >
              <ButtonSpinner loading={loading}>{t("save")}</ButtonSpinner>
            </PrimaryButton>
          )
        )}
      </CardFooter>
    </Card>
  );
}
