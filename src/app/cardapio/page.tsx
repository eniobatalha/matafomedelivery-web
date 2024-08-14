import React from 'react';
import { MainNav } from '@/components/main-nav/main-nav';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/user-nav/user-nav';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaPlus } from "react-icons/fa6";
import { GiTomato } from "react-icons/gi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import AlertButton from '@/components/alert-button/alert-button';
import CardConteudoProduto from '@/components/card-conteudo-produto/card-conteudo-produto';
import Tag from '@/components/tag-pedido/tag-pedido';

export default function categoria() {
    return (
        <>
            <div className="mb-8">
                <div className="flex h-16 items-center px-4 bg-orange-500">
                    <img
                        src="/img/LogoNome.png"
                        alt="Logo Nome Mata Fome Delivery"
                        className="w-32 h-auto ml-4 mr-8" />
                    <MainNav className="mx-6" />
                    <div className="ml-auto flex items-center space-x-8">
                        <UserNav />
                    </div>
                </div>
            </div><div>
                <div>
                    <div className="flex justify-between p-8">
                        <h2 className="text-3xl font-bold tracking-tight">Categorias</h2>
                        <Dialog>
                            {/* <DialogTrigger asChild> Dialog agora ficou dentro do componente */}
                            <Button variant="outlineOrange" className='gap-2'>
                                <FaPlus />
                                Adicionar Categoria
                            </Button>
                            {/* </DialogTrigger> */}
                            <DialogContent className="sm:max-w-[450px]">
                                <DialogHeader className="border-b border-gray-300 pb-2 mb-2">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-4">
                                            <DialogTitle className="text-base font-bold tracking-tight">Novo Pedido</DialogTitle>
                                            <Tag type="time" value="04/08/24 12:31" />
                                            <Tag type="status" value={1} /> {/* Tag de novo pedido */}
                                        </div>
                                    </div>
                                    <DialogDescription className='text-sm text-muted-foreground'>
                                        Lucas Pereira — Jardim das Flores — Rua das Acácias 123
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4 max-h-96 overflow-y-auto pr-2">
                                    <CardConteudoProduto
                                        image="/img/produtos/prod1.jpg"
                                        description="Black Dog Cheddar Bacon"
                                        quantity={3}
                                        unitPrice="22,90"
                                        totalPrice="68,70"
                                        additions={['Pão brioche', 'Queijo gorgonzola', 'Maionese picante', 'Cheddar']} />
                                    <CardConteudoProduto
                                        image="/img/produtos/prod2.jpg"
                                        description="Hot Dog Maximus Fomão 2.0"
                                        quantity={2}
                                        unitPrice="20,00"
                                        totalPrice="40,00"
                                        additions={['Batata palha', 'Molho especial']} />
                                    <CardConteudoProduto
                                        image="/img/produtos/prod3.jpg"
                                        description="Coca Cola 2L"
                                        quantity={1}
                                        unitPrice="10,00"
                                        totalPrice="10,00"
                                        additions={[]} />
                                    <CardConteudoProduto
                                        image="/img/produtos/prod10.jpg"
                                        description="Sandwich de Frango"
                                        quantity={2}
                                        unitPrice="15,00"
                                        totalPrice="30,00"
                                        additions={['Maionese', 'Alface', 'Tomate']} />
                                    <CardConteudoProduto
                                        image="/img/produtos/prod11.jpg"
                                        description="Suco de Laranja"
                                        quantity={1}
                                        unitPrice="8,00"
                                        totalPrice="8,00"
                                        additions={[]} />
                                </div>
                                <div className="h-20 border-t border-gray-300 pt-6">
                                    <div className="flex justify-between px-6 mb-4">
                                        <div className="text-xl text-orange-500 font-extrabold">Total</div>
                                        <div className="text-2xl text-orange-500 font-extrabold tracking-tight">R$ 118,70</div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="orange">Aceitar Pedido</Button>
                                    <Button variant="destructive">Cancelar Pedido</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                    </div>
                    <div className="px-8 mb-8">
                        <div className="mb-4">

                        </div>
                        {/* Grid Layout for Cards */}
                        <div className="grid grid-cols-1 gap-8">
                            {/* Primeiro Card */}
                            <Card className="flex flex-col">
                                <CardHeader className="border-b border-gray-300 bg-orange-100 pb-2 mb-2">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-4">
                                            <h2 className="text-xl font-bold tracking-tight">Comida Japonesa</h2>

                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="transparentOrange" className="p-1">
                                                    <GiHamburgerMenu className="h-5 w-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                    Editar Categoria
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                    Excluir Categoria
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                </CardHeader>
                                <CardContent className="pb-2 mb-4 mt-4 flex-1">
                                    <div className='flex'>

                                        <div className=''>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="transparentOrange" className="p-1">
                                                        <GiHamburgerMenu className="h-5 w-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                                    <DropdownMenuItem>
                                                        Editar Produto
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                        Excluir Produto
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>


                                            </DropdownMenu>
                                        </div>

                                        <div className='ml-2 flex-1'>
                                            <CardConteudoProduto
                                                image="/img/produtos/sushi.jpg"
                                                description="Sushi"
                                                quantity={1}
                                                unitPrice="22,90"
                                                totalPrice="22,90"
                                                additions={[]} />


                                        </div>



                                    </div>

                                    <div className='flex'>

                                        <div className=''>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="transparentOrange" className="p-1">
                                                        <GiHamburgerMenu className="h-5 w-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                                    <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                        Editar Produto
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                        Excluir Produto
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>


                                            </DropdownMenu>
                                        </div>

                                        <div className='ml-2 flex-1'>

                                            <CardConteudoProduto
                                                image="/img/produtos/ramen.png"
                                                description="Ramen"
                                                quantity={1}
                                                unitPrice="20,00"
                                                totalPrice="20,00"
                                                additions={[]} />

                                        </div>

                                    </div>

                                </CardContent>
                                <div className="h-20 border-t border-gray-300 pt-6">
                                    <div className="flex justify-between px-6 mb-4">
                                        <Button variant="orange" className="gap-2">
                                            <GiTomato className="h-5 w-5" />
                                            Adicionar produto
                                        </Button>
                                    </div>
                                </div>
                            </Card>

                            {/* Segundo Card */}
                            <Card className="flex flex-col">
                                <CardHeader className="border-b border-gray-300 bg-orange-100 pb-2 mb-2">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-4">
                                            <h2 className="text-xl font-bold tracking-tight">Massas</h2>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="transparentOrange" className="p-1">
                                                    <GiHamburgerMenu className="h-5 w-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                    Editar Categoria
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                    Excluir Categoria
                                                </DropdownMenuItem>

                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </CardHeader>

                                <CardContent className="pb-2 mb-4 mt-4 flex-1">

                                    <div className='flex'>

                                        <div className=''>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="transparentOrange" className="p-1">
                                                        <GiHamburgerMenu className="h-5 w-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                                    <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                        Editar Produto
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                        Excluir Produto
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>


                                            </DropdownMenu>
                                        </div>

                                        <div className='ml-2 flex-1'>

                                            <CardConteudoProduto
                                                image="/img/produtos/macarronada.png"
                                                description="Macarronada"
                                                quantity={1}
                                                unitPrice="18,00"
                                                totalPrice="18,00"
                                                additions={[]} />

                                        </div>

                                    </div>


                                    <div className='flex'>

                                        <div className=''>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="transparentOrange" className="p-1">
                                                        <GiHamburgerMenu className="h-5 w-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                                    <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                        Editar Produto
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                        Excluir Produto
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>

                                            </DropdownMenu>
                                        </div>

                                        <div className='ml-2 flex-1'>

                                            <CardConteudoProduto
                                                image="/img/produtos/raviole.jpg"
                                                description="Raviole"
                                                quantity={1}
                                                unitPrice="12,00"
                                                totalPrice="12,00"
                                                additions={[]} />

                                        </div>

                                    </div>


                                </CardContent>
                                <div className="h-20 border-t border-gray-300 pt-6">
                                    <div className="flex justify-between px-6 mb-4">
                                        <Button variant="orange" className="gap-2">
                                            <GiTomato className="h-5 w-5" />
                                            Adicionar produto
                                        </Button>
                                    </div>
                                </div>
                            </Card>

                            {/* Terceiro Card */}
                            <Card className="flex flex-col">
                                <CardHeader className="border-b border-gray-300 bg-orange-100 pb-2 mb-2">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-4">
                                            <h2 className="text-xl font-bold tracking-tight">Fast Food</h2>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="transparentOrange" className="p-1">
                                                    <GiHamburgerMenu className="h-5 w-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                    Editar Categoria
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                    Excluir Categoria
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </CardHeader>
                                <CardContent className="pb-2 mb-4 mt-4 flex-1">

                                    <div className='flex'>

                                        <div className=''>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="transparentOrange" className="p-1">
                                                        <GiHamburgerMenu className="h-5 w-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                                    <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                        Editar Produto
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                        Excluir Produto
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>


                                            </DropdownMenu>
                                        </div>

                                        <div className='ml-2 flex-1'>

                                            <CardConteudoProduto
                                                image="/img/produtos/hamburger.png"
                                                description="hamburger"
                                                quantity={1}
                                                unitPrice="15,00"
                                                totalPrice="15,00"
                                                additions={[]} />

                                        </div>

                                    </div>

                                    <div className='flex'>

                                        <div className=''>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="transparentOrange" className="p-1">
                                                        <GiHamburgerMenu className="h-5 w-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                                    <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                        Editar Produto
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                        Excluir Produto
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>


                                            </DropdownMenu>
                                        </div>

                                        <div className='ml-2 flex-1'>

                                            <CardConteudoProduto
                                                image="/img/produtos/batata frita.jpg"
                                                description="Refrigerante Lata"
                                                quantity={1}
                                                unitPrice="10,00"
                                                totalPrice="10,00"
                                                additions={[]} />

                                        </div>

                                    </div>



                                </CardContent>
                                <div className="h-20 border-t border-gray-300 pt-6">
                                    <div className="flex justify-between px-6 mb-4">
                                        <Button variant="orange" className="gap-2">
                                            <GiTomato className="h-5 w-5" />
                                            Adicionar produto
                                        </Button>
                                    </div>
                                </div>
                            </Card>

                            {/* Quarto Card */}
                            <Card className="flex flex-col">
                                <CardHeader className="border-b border-gray-300 bg-orange-100 pb-2 mb-2">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-4">
                                            <h2 className="text-xl font-bold tracking-tight">Pizza</h2>

                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="transparentOrange" className="p-1">
                                                    <GiHamburgerMenu className="h-5 w-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                    Editar Categoria
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                    Excluir Categoria
                                                </DropdownMenuItem>

                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                </CardHeader>
                                <CardContent className="pb-2 mb-4 mt-4 flex-1">

                                    <div className='flex'>

                                        <div className=''>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="transparentOrange" className="p-1">
                                                        <GiHamburgerMenu className="h-5 w-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                                    <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                        Editar Produto
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                        Excluir Produto
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>


                                            </DropdownMenu>
                                        </div>

                                        <div className='ml-2 flex-1'>

                                            <CardConteudoProduto
                                                image="/img/produtos/pizza calabresa.png"
                                                description="Pizza de Calabresa"
                                                quantity={1}
                                                unitPrice="36,00"
                                                totalPrice="36,00"
                                                additions={[]} />

                                        </div>

                                    </div>

                                    <div className='flex'>

                                        <div className=''>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="transparentOrange" className="p-1">
                                                        <GiHamburgerMenu className="h-5 w-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                                    <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                        Editar Produto
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                        Excluir Produto
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>


                                            </DropdownMenu>
                                        </div>

                                        <div className='ml-2 flex-1'>

                                            <CardConteudoProduto
                                                image="/img/produtos/pizza chocolate.jpg"
                                                description="Pizza de Chocolate"
                                                quantity={1}
                                                unitPrice="36,00"
                                                totalPrice="36,00"
                                                additions={[]} />

                                        </div>

                                    </div>


                                </CardContent>
                                <div className="h-20 border-t border-gray-300 pt-6">
                                    <div className="flex justify-between px-6 mb-4">
                                        <Button variant="orange" className="gap-2">
                                            <GiTomato className="h-5 w-5" />
                                            Adicionar produto
                                        </Button>
                                    </div>
                                </div>
                            </Card>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

