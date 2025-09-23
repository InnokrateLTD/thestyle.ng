import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/app-components/ui/button";
import { Calendar } from "@/app-components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app-components/ui/popover";

interface DatePickerWithRangeProps {
  className?: string;
  initialDate?: DateRange;
  onSelectDateRange: (dateRange: DateRange | undefined) => void;
}

export function DatePickerWithRange({
  className,
  initialDate = { from: undefined, to: undefined },
  onSelectDateRange,
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(initialDate);

  // Callback function to pass selected date range to parent component
  React.useEffect(() => {
    onSelectDateRange(date);
  }, [date, onSelectDateRange]);

  // Function to clear the selected date range
  const handleClear = () => {
    setDate(undefined);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <div className="relative">
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] rounded-none h-11 justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Filter by Date Range</span>
              )}
            </Button>
            {date && (
              <button
                className="absolute top-0 right-0 p-2 text-sm text-gray-500 focus:outline-none"
                onClick={handleClear}
              >
                Clear
              </button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
