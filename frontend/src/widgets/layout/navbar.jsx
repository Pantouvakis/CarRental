import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Navbar as MTNavbar, MobileNav, Typography, Button, IconButton } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "./../../img/logo_white.png";

export function Navbar({ brandName, routes }) {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
    }, []);

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {routes
                .filter(({ hidden }) => !hidden)
                .map(({ name, path, icon, href, target }) => (
                    <Typography
                        key={name}
                        as="li"
                        variant="small"
                        color="inherit"
                        className="capitalize"
                    >
                        {href ? (
                            <a
                                href={href}
                                target={target}
                                className="flex items-center gap-1 p-1 font-bold"
                            >
                                {icon &&
                                    React.createElement(icon, {
                                        className: "w-[18px] h-[18px] opacity-75 mr-1",
                                    })}
                                {name}
                            </a>
                        ) : (
                            <Link
                                to={path}
                                target={target}
                                className="flex items-center gap-1 p-1 font-bold"
                            >
                                {icon &&
                                    React.createElement(icon, {
                                        className: "w-[18px] h-[18px] opacity-75 mr-1",
                                    })}
                                {name}
                            </Link>
                        )}
                    </Typography>
                ))}
        </ul>
    );

    return (
        <MTNavbar color="transparent" className="p-3">
            <div className="container mx-auto flex items-center justify-between text-white">
                {/* Replace brandName with logo */}
                <Link to="/" className="mr-4 ml-2">
                    <img src={logo} alt={brandName} className="h-8 w-auto" />
                </Link>
                <div className="hidden lg:block">{navList}</div>
                <div className="hidden gap-2 lg:flex">
                    <a href="https://www.karpadu.com/#contact" target="_blank">
                        <Button variant="text" size="sm" color="white" fullWidth>
                            contact us
                        </Button>
                    </a>
                </div>
                <IconButton
                    variant="text"
                    size="sm"
                    color="white"
                    className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <XMarkIcon strokeWidth={2} className="h-6 w-6" />
                    ) : (
                        <Bars3Icon strokeWidth={2} className="h-6 w-6" />
                    )}
                </IconButton>
            </div>
            <MobileNav
                className="rounded-xl bg-white px-4 pt-2 pb-4 text-blue-gray-900"
                open={openNav}
            >
                <div className="container mx-auto">
                    {navList}
                    {/*<a*/}
                    {/*    href="https://www.material-tailwind.com/blocks/react?ref=mtkr"*/}
                    {/*    target="_blank"*/}
                    {/*    className="mb-2 block"*/}
                    {/*>*/}
                    {/*    <Button variant="text" size="sm" fullWidth>*/}
                    {/*        pro version*/}
                    {/*    </Button>*/}
                    {/*</a>*/}
                </div>
            </MobileNav>
        </MTNavbar>
    );
}

Navbar.defaultProps = {
    brandName: "Karpadu",
};

Navbar.propTypes = {
    brandName: PropTypes.string,
    routes: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            path: PropTypes.string,
            icon: PropTypes.elementType,
            href: PropTypes.string,
            target: PropTypes.string,
            hidden: PropTypes.bool,
        })
    ).isRequired,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
