import HomeFive from "@/components/homes/home-five";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Vadaanya Janaa Society — From Dreams to Degrees",
  description:
    "Vadaanya Janaa Society turns a government-school child's hope into a degree — through talent tests, scholarships, laptops and mentorship across AP & Telangana since 2010.",
};

const page = () => {
  return (
    <Wrapper>
      <HomeFive />
    </Wrapper>
  );
};

export default page;