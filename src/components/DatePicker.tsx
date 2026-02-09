import { useState, useRef, useEffect } from 'react';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  className?: string;
}

export default function DatePicker({ value, onChange, placeholder = 'mm/dd/yyyy', id, className = '' }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayDate, setDisplayDate] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedDate = value ? new Date(value) : null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDisplayValue = (dateStr: string) => {
    if (!dateStr) return '';
    // Handle both formats: "mm/dd/yyyy" and "yyyy-mm-dd"
    const parts = dateStr.includes('/') ? dateStr.split('/') : null;
    if (parts && parts.length === 3) {
      // Already in mm/dd/yyyy format
      const month = parts[0].padStart(2, '0');
      const day = parts[1].padStart(2, '0');
      const year = parts[2];
      return `${month}/${day}/${year}`;
    }
    // Fallback to Date parsing
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleDateSelect = (date: Date) => {
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    const year = date.getFullYear();
    onChange(`${month}/${day}/${year}`);
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange('');
    setIsOpen(false);
  };

  const handleToday = () => {
    const today = new Date();
    handleDateSelect(today);
  };

  const months = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 120 }, (_, i) => currentYear - i);

  const handleMonthChange = (monthIndex: number) => {
    setDisplayDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(monthIndex);
      return newDate;
    });
  };

  const handleYearChange = (year: number) => {
    setDisplayDate(prev => {
      const newDate = new Date(prev);
      newDate.setFullYear(year);
      return newDate;
    });
  };

  const getCalendarDays = () => {
    const year = displayDate.getFullYear();
    const month = displayDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days: Array<{ date: Date; isCurrentMonth: boolean }> = [];

    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, daysInPrevMonth - i),
        isCurrentMonth: false
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }

    return days;
  };

  const isSameDay = (date1: Date | null, date2: Date) => {
    if (!date1) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return isSameDay(today, date);
  };

  const calendarDays = getCalendarDays();
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div ref={containerRef} className="relative">
      <input
        id={id}
        type="text"
        value={formatDisplayValue(value)}
        onClick={() => setIsOpen(!isOpen)}
        readOnly
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-neutral-900/50 border rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition cursor-pointer ${
          className || 'border-neutral-600'
        }`}
      />

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-neutral-800 border border-neutral-600 rounded-xl shadow-2xl overflow-hidden w-80">
          <div className="p-4 border-b border-neutral-600">
            <div className="flex items-center gap-2 mb-4">
              <select
                value={displayDate.getMonth()}
                onChange={(e) => handleMonthChange(parseInt(e.target.value))}
                className="flex-1 px-3 py-2 bg-neutral-900/50 border border-neutral-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition cursor-pointer"
              >
                {months.map((month, index) => (
                  <option key={month} value={index}>
                    {month}
                  </option>
                ))}
              </select>

              <select
                value={displayDate.getFullYear()}
                onChange={(e) => handleYearChange(parseInt(e.target.value))}
                className="flex-1 px-3 py-2 bg-neutral-900/50 border border-neutral-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition cursor-pointer"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map(day => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-neutral-400 py-1"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                const isSelected = isSameDay(selectedDate, day.date);
                const isTodayDate = isToday(day.date);

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleDateSelect(day.date)}
                    className={`
                      py-2 text-sm rounded-lg transition
                      ${!day.isCurrentMonth ? 'text-neutral-600' : 'text-neutral-200'}
                      ${isSelected ? 'bg-blue-500 text-white font-semibold' : 'hover:bg-neutral-700'}
                      ${isTodayDate && !isSelected ? 'ring-1 ring-blue-400' : ''}
                    `}
                  >
                    {day.date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3 bg-neutral-900/50 flex justify-between">
            <button
              type="button"
              onClick={handleClear}
              className="px-3 py-1.5 text-sm text-neutral-200 hover:text-white transition"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleToday}
              className="px-3 py-1.5 text-sm text-neutral-200 hover:text-white transition"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
