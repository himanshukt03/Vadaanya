import type { Metadata } from "next";
import NotFound from "@/components/pages/error";
import Wrapper from "@/layouts/Wrapper";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you're looking for doesn't exist. Return to the Vadaanya Janaa Society homepage.",
  robots: { index: false, follow: false },
};

const NotFoundPage = () => {
   return (
      <Wrapper>
         <NotFound />
      </Wrapper>
   )
}

export default NotFoundPage