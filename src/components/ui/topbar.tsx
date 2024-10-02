import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";

export function MenubarDemo() {
  return (
    <Menubar className="px-10 py-6 flex justify-between items-center">
      <MenubarMenu>
        <div className="h-8 w-8 relative">
          <Image src={"/endcorp.png"} alt="Endcorp" fill={true} />
        </div>
      </MenubarMenu>
      <div className="flex items-center gap-x-4">
        <Label className="text-sm">
          Last refresh: <span className="text-md font-bold">02 Sept 5:55 GMT</span>
        </Label>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
                <div className="border rounded-sm px-3 py-1" >
                    i
                </div>
                </TooltipTrigger>
            <TooltipContent>
              <p>Data refreshes every day at 23:59 Hrs GMT</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </Menubar>
  );
}
