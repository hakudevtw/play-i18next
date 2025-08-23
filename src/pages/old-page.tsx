import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { getServerSideLang } from "@/i18n/migration";
import type { GetServerSideProps } from "next";

export default function Page() {
  const { t } = useTranslation("translation");
  return (
    <div>
      <h1 className="text-red-300">{t("h1")}</h1>
      <p>Hello, I'm an old page waiting for migration!</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const locale = getServerSideLang(context);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
};
