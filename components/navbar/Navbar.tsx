import { isAdmin } from "@/utils/actions";
import Container from "../../global/Container"
import Logo from "./Logo"
import Profile from "./Profile"
import RegisteredCustomers from "./RegisteredCustomers";

const Navbar = async () => {
    const { isRoleAdmin, error } = await isAdmin();
        return (
        <nav className="border-b" >
            <Container className="flex flex-row sm:place-content-between gap-5 justify-between py-3">
                <Logo isAdmin={isRoleAdmin} error={error} />
                {isRoleAdmin ? <RegisteredCustomers /> : null}   
                <Profile />
            </Container>
        </nav>
    )
}

export default Navbar
