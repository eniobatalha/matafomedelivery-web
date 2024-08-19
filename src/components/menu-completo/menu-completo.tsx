import React from 'react';
import { MainNav } from '@/components/main-nav/main-nav';
import { UserNav } from '@/components/user-nav/user-nav';
import Image from 'next/image';

const MenuCompleto: React.FC = () => {
    return (
        <div className="flex h-16 items-center px-4 bg-orange-500">
            <Image
                src="/img/LogoNome.png"
                alt="Logo Nome Mata Fome Delivery"
                className="w-32 h-auto ml-4 mr-8" />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-8">
                <UserNav />
            </div>
        </div>
    );
};

export default MenuCompleto;
