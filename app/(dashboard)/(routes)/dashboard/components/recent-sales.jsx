import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/sensor1.png" alt="Sensor" />
          <AvatarFallback>S1</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sensor A1</p>
          <p className="text-sm text-muted-foreground">192.168.0.1</p>
        </div>
        <div className="md:ml-auto font-medium">+20 Readings</div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/sensor2.png" alt="Sensor" />
          <AvatarFallback>S2</AvatarFallback>
        </Avatar>
        <div className="ml-4 flex-col md:flex-row space-y-1">
          <p className="text-sm font-medium leading-none">Sensor B2</p>
          <p className="text-sm text-muted-foreground">192.168.0.2</p>
        </div>
        <div className="md:ml-auto font-medium">+45 Readings</div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/sensor3.png" alt="Sensor" />
          <AvatarFallback>S3</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sensor C3</p>
          <p className="text-sm text-muted-foreground">192.168.0.3</p>
        </div>
        <div className="md:ml-auto font-medium">+15 Readings</div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/sensor4.png" alt="Sensor" />
          <AvatarFallback>S4</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sensor D4</p>
          <p className="text-sm text-muted-foreground">192.168.0.4</p>
        </div>
        <div className="md:ml-auto font-medium">+30 Readings</div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/sensor5.png" alt="Sensor" />
          <AvatarFallback>S5</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sensor E5</p>
          <p className="text-sm text-muted-foreground">192.168.0.5</p>
        </div>
        <div className="md:ml-auto font-medium">+10 Readings</div>
      </div>
    </div>
  )
}
