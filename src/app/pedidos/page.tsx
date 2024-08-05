import React from 'react';
import { MainNav } from '@/components/main-nav/main-nav';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/user-nav/user-nav';
import { GiHamburgerMenu } from "react-icons/gi";
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
import Tag from '@/components/tag-pedido/tag-pedido';
import CardConteudoProduto from '@/components/card-conteudo-produto/card-conteudo-produto';
import AlertButton from '@/components/alert-button/alert-button';

const pedidos = () => {
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
                        <h2 className="text-3xl font-bold tracking-tight">Acompanhamento de Pedidos</h2>
                        <Dialog>
                            {/* <DialogTrigger asChild> Dialog agora ficou dentro do componente */}
                            <AlertButton />
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
                            <Tabs defaultValue="todos" className="space-y-4">
                                <TabsList className='w-auto'>
                                    <TabsTrigger value="todos">Todos</TabsTrigger>
                                    <TabsTrigger value="empreparo">
                                        Em Preparo
                                    </TabsTrigger>
                                    <TabsTrigger value="ementrega">
                                        Em Entrega
                                    </TabsTrigger>
                                    <TabsTrigger value="entregues">
                                        Entregues
                                    </TabsTrigger>
                                    <TabsTrigger value="cancelados">
                                        Cancelados
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                        {/* Grid Layout for Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Primeiro Card */}
                            <Card className="flex flex-col">
                                <CardHeader className="border-b border-gray-300 bg-orange-100 pb-2 mb-2">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-4">
                                            <h2 className="text-xl font-bold tracking-tight">#109</h2>
                                            <Tag type="time" value="04/08/24 12:31" />
                                            <Tag type="status" value={2} />
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="transparentOrange" className="p-1">
                                                    <GiHamburgerMenu className="h-5 w-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                    Iniciar preparo
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                    Enviar pedido
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                    Cancelar pedido
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <h3 className='text-sm text-muted-foreground'>
                                        Lucas Pereira — Jardim das Flores — Rua das Acácias 123
                                    </h3>
                                </CardHeader>
                                <CardContent className="pb-2 mb-4 mt-4 flex-1">
                                    <CardConteudoProduto
                                        image="/img/produtos/prod1.jpg"
                                        description="Black Dog Cheddar Bacon"
                                        quantity={3}
                                        unitPrice="22,90"
                                        totalPrice="68,70"
                                        additions={['Pão brioche', 'Queijo gorgonzola', 'Maionese picante', 'Cheddar']} />
                                    <CardConteudoProduto
                                        image="/img/produtos/prod2.jpg"
                                        description="Hot Dog Maximus Fomão"
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
                                </CardContent>
                                <div className="h-20 border-t border-gray-300 pt-6">
                                    <div className="flex justify-between px-6 mb-4">
                                        <div className="text-xl text-orange-500 font-extrabold">Total</div>
                                        <div className="text-2xl text-orange-500 font-extrabold tracking-tight">R$ 118,70</div>
                                    </div>
                                </div>
                            </Card>

                            {/* Segundo Card */}
                            <Card className="flex flex-col">
                                <CardHeader className="border-b border-gray-300 bg-orange-100 pb-2 mb-2">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-4">
                                            <h2 className="text-xl font-bold tracking-tight">#110</h2>
                                            <Tag type="time" value="04/08/24 14:15" />
                                            <Tag type="status" value={1} />
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="transparentOrange" className="p-1">
                                                    <GiHamburgerMenu className="h-5 w-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                    Iniciar preparo
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                    Enviar pedido
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                    Cancelar pedido
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <h3 className='text-sm text-muted-foreground'>
                                        Ana Costa — Vila Nova — Rua dos Pássaros 456
                                    </h3>
                                </CardHeader>
                                <CardContent className="pb-2 mb-4 mt-4 flex-1">
                                    <CardConteudoProduto
                                        image="/img/produtos/prod4.jpg"
                                        description="Cheeseburger"
                                        quantity={2}
                                        unitPrice="18,00"
                                        totalPrice="36,00"
                                        additions={['Cebola caramelizada', 'Alface', 'Tomate']} />
                                    <CardConteudoProduto
                                        image="/img/produtos/prod5.jpg"
                                        description="Batata Frita"
                                        quantity={1}
                                        unitPrice="12,00"
                                        totalPrice="12,00"
                                        additions={['Ketchup', 'Maionese']} />
                                </CardContent>
                                <div className="h-20 border-t border-gray-300 pt-6">
                                    <div className="flex justify-between px-6 mb-4">
                                        <div className="text-xl text-orange-500 font-extrabold">Total</div>
                                        <div className="text-2xl text-orange-500 font-extrabold tracking-tight">R$ 48,00</div>
                                    </div>
                                </div>
                            </Card>

                            {/* Terceiro Card */}
                            <Card className="flex flex-col">
                                <CardHeader className="border-b border-gray-300 bg-orange-100 pb-2 mb-2">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-4">
                                            <h2 className="text-xl font-bold tracking-tight">#111</h2>
                                            <Tag type="time" value="04/08/24 15:30" />
                                            <Tag type="status" value={3} />
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="transparentOrange" className="p-1">
                                                    <GiHamburgerMenu className="h-5 w-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                    Iniciar preparo
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                    Enviar pedido
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                    Cancelar pedido
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <h3 className='text-sm text-muted-foreground'>
                                        João Souza — Centro — Rua dos Girassóis 789
                                    </h3>
                                </CardHeader>
                                <CardContent className="pb-2 mb-4 mt-4 flex-1">
                                    <CardConteudoProduto
                                        image="/img/produtos/prod6.jpg"
                                        description="Pizza Margherita"
                                        quantity={1}
                                        unitPrice="30,00"
                                        totalPrice="30,00"
                                        additions={['Manjericão', 'Mussarela']} />
                                    <CardConteudoProduto
                                        image="/img/produtos/prod7.jpg"
                                        description="Refrigerante Lata"
                                        quantity={3}
                                        unitPrice="5,00"
                                        totalPrice="15,00"
                                        additions={[]} />
                                </CardContent>
                                <div className="h-20 border-t border-gray-300 pt-6">
                                    <div className="flex justify-between px-6 mb-4">
                                        <div className="text-xl text-orange-500 font-extrabold">Total</div>
                                        <div className="text-2xl text-orange-500 font-extrabold tracking-tight">R$ 45,00</div>
                                    </div>
                                </div>
                            </Card>

                            {/* Quarto Card */}
                            <Card className="flex flex-col">
                                <CardHeader className="border-b border-gray-300 bg-orange-100 pb-2 mb-2">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-4">
                                            <h2 className="text-xl font-bold tracking-tight">#112</h2>
                                            <Tag type="time" value="04/08/24 16:45" />
                                            <Tag type="status" value={4} />
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="transparentOrange" className="p-1">
                                                    <GiHamburgerMenu className="h-5 w-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                    Iniciar preparo
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                    Enviar pedido
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                    Cancelar pedido
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <h3 className='text-sm text-muted-foreground'>
                                        Carla Martins — Jardim das Oliveiras — Rua das Orquídeas 321
                                    </h3>
                                </CardHeader>
                                <CardContent className="pb-2 mb-4 mt-4 flex-1">
                                    <CardConteudoProduto
                                        image="/img/produtos/prod8.jpg"
                                        description="Spaghetti Bolognese"
                                        quantity={2}
                                        unitPrice="28,00"
                                        totalPrice="56,00"
                                        additions={['Queijo parmesão', 'Alho']} />
                                </CardContent>
                                <div className="h-20 border-t border-gray-300 pt-6">
                                    <div className="flex justify-between px-6 mb-4">
                                        <div className="text-xl text-orange-500 font-extrabold">Total</div>
                                        <div className="text-2xl text-orange-500 font-extrabold tracking-tight">R$ 56,00</div>
                                    </div>
                                </div>
                            </Card>

                            {/* Quinto Card */}
                            <Card className="flex flex-col">
                                <CardHeader className="border-b border-gray-300 bg-orange-100 pb-2 mb-2">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-4">
                                            <h2 className="text-xl font-bold tracking-tight">#113</h2>
                                            <Tag type="time" value="04/08/24 18:00" />
                                            <Tag type="status" value={5} />
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="transparentOrange" className="p-1">
                                                    <GiHamburgerMenu className="h-5 w-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                    Iniciar preparo
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                    Enviar pedido
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                    Cancelar pedido
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <h3 className='text-sm text-muted-foreground'>
                                        Felipe Lima — Bairro do Prado — Rua das Magnólias 654
                                    </h3>
                                </CardHeader>
                                <CardContent className="pb-2 mb-4 mt-4 flex-1">
                                    <CardConteudoProduto
                                        image="/img/produtos/prod9.jpg"
                                        description="Coxinha"
                                        quantity={6}
                                        unitPrice="6,00"
                                        totalPrice="36,00"
                                        additions={['Ketchup', 'Maionese']} />
                                </CardContent>
                                <div className="h-20 border-t border-gray-300 pt-6">
                                    <div className="flex justify-between px-6 mb-4">
                                        <div className="text-xl text-orange-500 font-extrabold">Total</div>
                                        <div className="text-2xl text-orange-500 font-extrabold tracking-tight">R$ 36,00</div>
                                    </div>
                                </div>
                            </Card>

                            {/* Sexto Card */}
                            <Card className="flex flex-col">
                                <CardHeader className="border-b border-gray-300 bg-orange-100 pb-2 mb-2">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-4">
                                            <h2 className="text-xl font-bold tracking-tight">#114</h2>
                                            <Tag type="time" value="04/08/24 19:15" />
                                            <Tag type="status" value={1} />
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="transparentOrange" className="p-1">
                                                    <GiHamburgerMenu className="h-5 w-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                    Iniciar preparo
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                    Enviar pedido
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                    Cancelar pedido
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <h3 className='text-sm text-muted-foreground'>
                                        Maria Silva — Jardim Primavera — Rua das Orquídeas 987
                                    </h3>
                                </CardHeader>
                                <CardContent className="pb-2 mb-4 mt-4 flex-1">
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
                                </CardContent>
                                <div className="h-20 border-t border-gray-300 pt-6">
                                    <div className="flex justify-between px-6 mb-4">
                                        <div className="text-xl text-orange-500 font-extrabold">Total</div>
                                        <div className="text-2xl text-orange-500 font-extrabold tracking-tight">R$ 38,00</div>
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

export default pedidos;