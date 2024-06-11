import React from 'react';

const DatePicker = ({ selectedDate, onDateChange }) => {
    return (
        <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
        />
    );
};

export default DatePicker;
