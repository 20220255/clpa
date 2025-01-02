import { getTotalRegisteredCustomers, isAdmin } from "@/utils/actions";
import Container from "../../global/Container"
import Logo from "./Logo"
import Profile from "./Profile"
import RegisteredCustomers from "./RegisteredCustomers";
import { Suspense } from "react";
import Spinner from "../shared/Spinner";

const Navbar = async () => {
    const { isRoleAdmin, error } = await isAdmin();

    const { totalCustomers, error: totalCustomersError } = await getTotalRegisteredCustomers()

    return (
        <nav className="border-b" >
            <Container className="flex flex-row sm:place-content-between gap-5 justify-between py-3">
                <Logo isAdmin={isRoleAdmin} error={error} />
                <Suspense fallback={<Spinner />}>
                    {isRoleAdmin ? <RegisteredCustomers totalCustomers={totalCustomers} error={totalCustomersError} /> : null}
                    <Profile />
                </Suspense>
            </Container>
        </nav>
    )
}

export default Navbar
