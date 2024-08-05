import { MainNav } from "@/components/main-nav/main-nav"
import { UserNav } from "@/components/user-nav/user-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Textarea } from "@/components/ui/textarea"





export default function Cardapiopage(){
    return(
        <div className="border-b">
            <div className="flex h-16 items-center px-4 bg-orange-500">
                <img
                    src="/img/LogoNome.png"
                    alt="Logo Nome Mata Fome Delivery"
                    className="w-32 h-auto ml-4 mr-8"
                />
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-8">
                    <UserNav />
                </div>
            </div>
            <div className="p-8 flex items-center space-x-4 lg:space-x-10 w-full">
                <div className="text-3xl font-bold ">Cardápio</div>
                <div className="align-items: flex-end">
                    <Button variant="orange"> <img src="/img/adiçao.png" width={20} height={20} alt="" />Adicionar nova categoria</Button>
                </div>
                
            </div>

            <div className="justify-between">
                <Card className="w-[350px]  bg-orange-500 ml-4">
                     <CardHeader>
                          <CardTitle>Comida Japonesa</CardTitle>
                    </CardHeader>
                         <CardContent>
          <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Nome do produto a ser adicionado" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Ingredientes</Label>
              <Textarea></Textarea>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Cupom">Cupom</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Adicionar cupom de desconto?" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Sim">Sim</SelectItem>
                  <SelectItem value="Não">Não</SelectItem>
                </SelectContent>
              </Select>
              
            </div>
            <div>
                <Label>Preço do produto</Label>
                <Input type="number"></Input>
            </div>
            <div>
                <Label>Adicionar foto do produto</Label>
              <Input placeholder="Adicione a imagem do produto" type="file" >
              </Input>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button  variant="outline">Editar</Button>
        <Button className="ml-1 bg-green-500" variant="default">Adicionar</Button>
        <Button className="ml-1" variant="destructive">Excluir</Button>
      </CardFooter>
    </Card>
            </div>

          
        </div>
    )
}