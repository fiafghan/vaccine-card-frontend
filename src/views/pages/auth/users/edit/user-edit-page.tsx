import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import EditUserInformation from "./steps/edit-user-information";
import { EditUserPassword } from "./steps/edit-user-password";
import axiosClient from "@/lib/axois-client";
import { useEffect, useMemo, useState } from "react";
import { UserInformation } from "@/lib/types";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, KeyRound, ShieldBan } from "lucide-react";
import UserEditHeader from "./user-edit-header";
import EditUserPermissions from "./steps/edit-user-permissions";
import { UserPermission } from "@/database/tables";
import { useGeneralAuthState } from "@/context/AuthContextProvider";
import { PermissionEnum, RoleEnum } from "@/lib/constants";
import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "@/components/custom-ui/Breadcrumb/Breadcrumb";
import { EditUserActivity } from "./steps/edit-user-activity";
import { EditUserIssuedCirtificate } from "./steps/edit-user-issued-certificate";
import { EditUserCirtificatePayment } from "./steps/edit-user-certificate-payment";
import Shimmer from "@/components/custom-ui/shimmer/Shimmer";

export default function UserEditPage() {
  const { user } = useGeneralAuthState();
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);
  const handleGoHome = () => navigate("/dashboard", { replace: true });
  const { t, i18n } = useTranslation();
  let { id } = useParams();
  const direction = i18n.dir();
  const [failed, setFailed] = useState(false);
  const [userData, setUserData] = useState<UserInformation | undefined>();
  const loadInformation = async () => {
    try {
      const response = await axiosClient.get(
        `${user.role.name.startsWith("finance") ? "finance" : "epi"}/user/${id}`
      );
      if (response.status == 200) {
        const user = response.data.user as UserInformation;
        setUserData(user);
        if (failed) setFailed(false);
      }
    } catch (error: any) {
      toast({
        toastType: "ERROR",
        title: t("error"),
        description: error.response.data.message,
      });
      console.log(error);
      setFailed(true);
    }
  };
  useEffect(() => {
    loadInformation();
  }, []);

  const selectedTabStyle = `rtl:text-xl-rtl ltr:text-lg-ltr relative w-[95%] bg-card-foreground/5 justify-start mx-auto ltr:py-2 rtl:py-[5px] data-[state=active]:bg-tertiary font-semibold data-[state=active]:text-primary-foreground gap-x-3`;
  const per: UserPermission = user?.permissions.get(
    PermissionEnum.users.name
  ) as UserPermission;
  const isAdmin = useMemo(() => {
    if (userData) {
      return (
        userData.role.id == RoleEnum.epi_admin ||
        userData.role.id == RoleEnum.finance_admin
      );
    }
  }, [userData?.role]);

  const tableList = useMemo(() => {
    if (!userData) return null;
    return Array.from(per.sub).map(([key, _subPermission], index: number) => {
      return key == PermissionEnum.users.sub.user_information ? (
        <TabsTrigger
          key={index}
          className={`${selectedTabStyle}`}
          value={key.toString()}
        >
          <Database className="size-[18px]" />
          {t("account_information")}
        </TabsTrigger>
      ) : key == PermissionEnum.users.sub.user_password ? (
        <TabsTrigger
          key={index}
          className={`${selectedTabStyle}`}
          value={key.toString()}
        >
          <KeyRound className="size-[18px]" />
          {t("update_account_password")}
        </TabsTrigger>
      ) : key == PermissionEnum.users.sub.user_permission ? (
        <TabsTrigger
          key={index}
          className={`${selectedTabStyle}`}
          value={key.toString()}
        >
          <ShieldBan className="size-[18px]" />
          {t("update_account_permissions")}
        </TabsTrigger>
      ) : key == PermissionEnum.users.sub.user_issued_certificate &&
        !isAdmin ? (
        <TabsTrigger
          key={index}
          className={`${selectedTabStyle}`}
          value={key.toString()}
        >
          <ShieldBan className="size-[18px]" />
          {t("issued_certificate")}
        </TabsTrigger>
      ) : key == PermissionEnum.users.sub.user_issued_certificate_payment &&
        !isAdmin ? (
        <TabsTrigger
          key={index}
          className={`${selectedTabStyle}`}
          value={key.toString()}
        >
          <ShieldBan className="size-[18px]" />
          {t("certificate_payment")}
        </TabsTrigger>
      ) : key == PermissionEnum.users.sub.user_profile_activity && !isAdmin ? (
        <TabsTrigger
          key={index}
          className={`${selectedTabStyle}`}
          value={key.toString()}
        >
          <ShieldBan className="size-[18px]" />
          {t("activity")}
        </TabsTrigger>
      ) : undefined;
    });
  }, [isAdmin, userData]);
  return (
    <div className="flex flex-col gap-y-3 px-3 pt-2 overflow-x-auto pb-12">
      <Breadcrumb>
        <BreadcrumbHome onClick={handleGoHome} />
        <BreadcrumbSeparator />
        <BreadcrumbItem onClick={handleGoBack}>{t("users")}</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem onClick={handleGoBack}>
          {userData?.username}
        </BreadcrumbItem>
      </Breadcrumb>
      {/* Cards */}
      <Tabs
        dir={direction}
        defaultValue={PermissionEnum.users.sub.user_information.toString()}
        className="flex flex-col sm:flex-row gap-x-3 gap-y-2 sm:gap-y-0"
      >
        <TabsList className="sm:min-h-[550px] h-fit pb-8 min-w-[300px] md:w-[300px] gap-y-4 items-start justify-start flex flex-col bg-card border">
          {tableList ? (
            <>
              <UserEditHeader
                id={id}
                failed={failed}
                userData={userData}
                setUserData={setUserData}
              />
              {tableList}
            </>
          ) : (
            <>
              <Shimmer className="shadow-none mx-auto size-[86px] mt-6 rounded-full" />
              <Shimmer className="h-[32px] shadow-none !mt-2 !mb-4 w-1/2 mx-auto rounded-sm" />
              <Shimmer className="h-24 shadow-none w-[80%] mx-auto rounded-sm" />
              <Shimmer className="h-[32px] shadow-none w-full rounded-sm" />
              <Shimmer className="h-[32px] shadow-none w-full rounded-sm" />
              <Shimmer className="h-[32px] shadow-none w-full rounded-sm" />
            </>
          )}
        </TabsList>

        <TabsContent
          className="flex-1 m-0"
          value={PermissionEnum.users.sub.user_information.toString()}
        >
          <EditUserInformation
            id={id}
            failed={failed}
            userData={userData}
            setUserData={setUserData}
            refreshPage={loadInformation}
            permissions={per}
          />
        </TabsContent>
        <TabsContent
          className="flex-1 m-0"
          value={PermissionEnum.users.sub.user_password.toString()}
        >
          <EditUserPassword
            id={id}
            userData={userData}
            failed={failed}
            refreshPage={loadInformation}
            permissions={per}
          />
        </TabsContent>
        <TabsContent
          className="flex-1 m-0"
          value={PermissionEnum.users.sub.user_permission.toString()}
        >
          <EditUserPermissions permissions={per} />
        </TabsContent>
        <TabsContent
          className="flex-1 m-0"
          value={PermissionEnum.users.sub.user_profile_activity.toString()}
        >
          <EditUserActivity
            failed={failed}
            refreshPage={loadInformation}
            permissions={per}
          />
        </TabsContent>
        <TabsContent
          className="flex-1 m-0"
          value={PermissionEnum.users.sub.user_issued_certificate.toString()}
        >
          <EditUserIssuedCirtificate
            failed={failed}
            refreshPage={loadInformation}
            permissions={per}
          />
        </TabsContent>
        <TabsContent
          className="flex-1 m-0"
          value={PermissionEnum.users.sub.user_issued_certificate_payment.toString()}
        >
          <EditUserCirtificatePayment
            failed={failed}
            refreshPage={loadInformation}
            permissions={per}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
