import { isAdmin } from "@/utils/actions";
import Container from "../../global/Container"
import Logo from "./Logo"
import Profile from "./Profile"
import { toast } from "react-toastify";

const Navbar = async () => {

    const { isRoleAdmin, error } = await isAdmin();

    if (error) toast.error(error);

        return (
        <nav className="border-b" >
            <Container className="flex flex-row sm:place-content-between justify-between py-3">
                <Logo isAdmin={isRoleAdmin} />
                <Profile />
            </Container>
        </nav>
    )
}

export default Navbar
