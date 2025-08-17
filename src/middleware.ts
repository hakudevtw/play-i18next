import { chain } from "@/middlewares/chain";
import { withI18n } from "@/middlewares/i18n.middleware";
import { withBase } from "@/middlewares/base.middleware";

export default chain([withBase, withI18n]);

export const config = {
  // #36308 Don't run page middleware on requests served from /public folder
  // https://github.com/vercel/next.js/discussions/36308
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
