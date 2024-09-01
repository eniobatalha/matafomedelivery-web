"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerHistorico({
  className,
  onDateSelect,
}: React.HTMLAttributes<HTMLDivElement> & { onDateSelect: (range: DateRange | undefined) => void }) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -2),
    to: new Date(),
  });

  const handleDateChange = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    onDateSelect(selectedDate);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[1/5] justify-start text-left font-normal shadow-md",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd/MM/yyyy")} -{" "}
                  {format(date.to, "dd/MM/yyyy")}
                </>
              ) : (
                format(date.from, "dd/MM/yyyy")
              )
            ) : (
              <span>Filtre por um período</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={1}
            modifiersClassNames={{
              range_start: "bg-orange-500 text-white",
              range_end: "bg-orange-500 text-white",
              range_middle: "bg-orange-100",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
