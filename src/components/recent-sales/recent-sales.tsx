import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function RecentSales() {
  return (
      <div className="space-y-8">
          <div className="flex items-center">
              <Avatar className="h-9 w-9">
                  <AvatarImage src="" alt="Avatar" />
                  <AvatarFallback>GF</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Giovani Feitosa</p>
                  <p className="text-sm text-muted-foreground">
                      (81)9 1234-5678
                  </p>
              </div>
              <div className="ml-auto font-medium">R$79,00</div>
          </div>
          <div className="flex items-center">
              <Avatar className="h-9 w-9">
                  <AvatarImage src="" alt="Avatar" />
                  <AvatarFallback>JG</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Jonathas Gabriel</p>
                  <p className="text-sm text-muted-foreground">(81)9 2345-6789</p>
              </div>
              <div className="ml-auto font-medium">R$139,00</div>
          </div>
          <div className="flex items-center">
              <Avatar className="h-9 w-9">
                  <AvatarImage src="" alt="Avatar" />
                  <AvatarFallback>EB</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Enio Batalha</p>
                  <p className="text-sm text-muted-foreground">
                      (81)9 3456-7890
                  </p>
              </div>
              <div className="ml-auto font-medium">R$99,00</div>
          </div>
          <div className="flex items-center">
              <Avatar className="h-9 w-9">
                  <AvatarImage src="" alt="Avatar" />
                  <AvatarFallback>ER</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Ernani Reis</p>
                  <p className="text-sm text-muted-foreground">(81)9 4567-8901</p>
              </div>
              <div className="ml-auto font-medium">R$76,00</div>
          </div>
          <div className="flex items-center">
              <Avatar className="h-9 w-9">
                  <AvatarImage src="" alt="Avatar" />
                  <AvatarFallback>CS</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Carlos Silva</p>
                  <p className="text-sm text-muted-foreground">(81)9 5678-9012</p>
              </div>
              <div className="ml-auto font-medium">R$39,00</div>
          </div>
      </div>
  )
}
