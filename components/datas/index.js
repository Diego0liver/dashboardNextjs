import {React, useState, useEffect, useContext} from "react";
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import {TotalContext} from '../../context'

export default function  Datas() {
  const { diasFilter } = useContext(TotalContext)  
  const [value, setValue] = useState(dayjs());
  const [highlightedDays, setHighlightedDays] = useState([]);

 
  useEffect(()=>{
    setHighlightedDays(diasFilter)
  },[]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        orientation='portrait'
        openTo="day"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
       
        renderInput={(params) => <TextField {...params}/>}
        renderDay={(day, _value, DayComponentProps) => {
          const isSelected =
            !DayComponentProps.outsideCurrentMonth &&
            highlightedDays.indexOf(day.date()) >= 0;
          return (
            <Badge
              key={day.toString()}
              overlap="circular"
              badgeContent={isSelected ? '🔵' : undefined}
            >
              <PickersDay {...DayComponentProps} />
            </Badge>
          );
        }}
      />
    </LocalizationProvider>
  );
}

