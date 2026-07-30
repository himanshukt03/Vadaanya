import Advisors from "@/components/pages/advisors";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
    title: "For Advisors | 100exNextGen",
    description: "Shape the future you see coming. Join 100exNextGen's advisory board and co-create the playbook for the next generation of exponential ventures.",
};

const AdvisorsPage = () => {
    return (
        <Wrapper>
            <Advisors />
        </Wrapper>
    )
}

export default AdvisorsPage;
