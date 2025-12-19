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
        <nav className="sticky top-0 z-40 bg-gradient-to-r from-blue-50 via-cyan-50 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 border-b border-slate-200/30 dark:border-slate-700/30">
            <Container className="flex flex-row sm:place-content-between gap-5 justify-between py-3 px-4">
                <Logo isAdmin={isRoleAdmin} error={error} />
                <div className="flex items-center gap-3">
                    <Suspense fallback={<Spinner />}>
                        {isRoleAdmin ? <RegisteredCustomers totalCustomers={totalCustomers} error={totalCustomersError} /> : null}
                        <Profile />
                    </Suspense>
                </div>
            </Container>
        </nav>
    )
}

export default Navbar
