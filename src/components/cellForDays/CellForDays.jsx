import {DAYS_COMBO, DAYS_BEFORE, DAYS_AFTER} from "../../data";
import './CellForDays.css';

function CellForDays({ item }) {
    // Delete all spaces
    const daysWithoutSpaces = item.days.replace(/\s/g, '');
    let beforeThursday, afterThursday;

    // Check if 'ч' is present
    if (daysWithoutSpaces.includes('ч')) {
        [beforeThursday, afterThursday] = daysWithoutSpaces.split('ч');
    } else {
        beforeThursday = daysWithoutSpaces;
        afterThursday = '';
    }

    const daysBeforeThursday = beforeThursday.split('').map(char => DAYS_BEFORE[char]);
    const daysAfterThursday = afterThursday.split('').map(char => DAYS_AFTER[char]);
    const days = [...daysBeforeThursday, ...daysAfterThursday];

    return (
        <td>
            {DAYS_COMBO[item.days] ? (
                <p>{DAYS_COMBO[item.days]}</p>
            ) : (
                <>
                    <p>По расписанию:</p>
                    {days.length > 0 &&
                        <ul className="days__for__routes">
                            {days.map((day, dayIndex) => (
                                <li id="day__name" className="list__value" key={dayIndex}>
                                    {day}
                                </li>
                            ))}
                        </ul>
                    }
                </>
            )}
        </td>
    );
}

export default CellForDays;
