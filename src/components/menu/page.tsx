import React from 'react'
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";
import { MdMenuBook, MdHistory } from "react-icons/md";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Menu = () => {
    return (
        <div className="w-full bg-orange-500">
            <NavigationMenu className="h-14">
                <NavigationMenuList className="flex justify-around w-full">
                    <img
                        src="/img/LogoNome.png"
                        alt="Logo Nome Mata Fome Delivery"
                        className="w-32 h-auto ml-8 mr-8"
                    />
                    <NavigationMenuItem>
                        <Link href="/area-logada" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <FaHome className="mr-2" />
                                Início
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/docs" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <GiKnifeFork className="mr-2" />
                                Acompanhar Pedidos
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/docs" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <MdMenuBook className="mr-2" />
                                Cardápio
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/payments" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <MdHistory className="mr-2" />
                                Histórico de Pedidos
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

export default Menu