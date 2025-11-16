
import React from 'react';
import { Course } from '../types';

interface ScheduleVisualizerProps {
    courses: Course[];
}

const DAYS = ['Su', 'M', 'T', 'W', 'Th', 'F', 'Sa'];
const TIME_LABELS = Array.from({ length: 15 }, (_, i) => {
    const hour = (i + 7) % 12 === 0 ? 12 : (i + 7) % 12;
    const ampm = (i + 7) < 12 || (i + 7) === 24 ? 'AM' : 'PM';
    return `${hour} ${ampm}`;
});
const START_HOUR = 7; // Start grid at 7 AM

const COURSE_COLORS = [
    'bg-amber-200 border-amber-400 text-amber-800',
    'bg-sky-200 border-sky-400 text-sky-800',
    'bg-emerald-200 border-emerald-400 text-emerald-800',
    'bg-rose-200 border-rose-400 text-rose-800',
    'bg-indigo-200 border-indigo-400 text-indigo-800',
    'bg-fuchsia-200 border-fuchsia-400 text-fuchsia-800',
    'bg-lime-200 border-lime-400 text-lime-800',
    'bg-cyan-200 border-cyan-400 text-cyan-800',
];

const parseTime = (timeStr: string) => {
    const parts = timeStr.split(' ');
    if (parts.length < 2) {
        return { days: [], startMinutes: 0, endMinutes: 0 };
    }

    const daysStr = parts[0];
    const timeRange = parts.slice(1).join(' '); 
    
    const timeParts = timeRange.split('-').map(s => s.trim());
    const startTimeStr = timeParts[0];
    const endTimeStr = timeParts[1];

    if (!startTimeStr || !endTimeStr) {
        return { days: [], startMinutes: 0, endMinutes: 0 };
    }

    const days = daysStr.match(/Su|Sa|Th|M|T|W|F/g) || [];

    const parseTime12hr = (t: string) => {
        const isPM = t.toUpperCase().includes('PM');
        let [hour, minute] = t.replace(/AM|PM/i, '').trim().split(':').map(Number);
        minute = minute || 0;
        
        if (isPM && hour < 12) {
            hour += 12;
        }
        if (!isPM && hour === 12) { // 12 AM (midnight)
            hour = 0;
        }
        return hour * 60 + minute;
    };

    const startMinutes = parseTime12hr(startTimeStr);
    const endMinutes = parseTime12hr(endTimeStr);

    return { days, startMinutes, endMinutes };
};

const ScheduleVisualizer: React.FC<ScheduleVisualizerProps> = ({ courses }) => {
    
    const events = courses.flatMap((course, courseIndex) =>
        course.sections.map(section => {
            const { days, startMinutes, endMinutes } = parseTime(section.time);
            return days.map(day => ({
                id: `${course.id}-${section.id}-${day}`,
                course,
                section,
                day,
                startMinutes,
                endMinutes,
                color: COURSE_COLORS[courseIndex % COURSE_COLORS.length],
            }));
        })
    ).flat();

    return (
        <div className="bg-brand-surface p-4 rounded-lg overflow-x-auto border border-brand-secondary">
            <div className="grid grid-cols-[auto_repeat(7,minmax(0,1fr))] min-w-[900px]">
                {/* Headers */}
                <div className="sticky left-0 bg-brand-surface z-10"></div>
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                    <div key={day} className="text-center font-bold text-brand-text pb-2">{day}</div>
                ))}

                {/* Grid layout */}
                <div className="row-span-1 col-start-1 col-end-2 grid" style={{ gridTemplateRows: `repeat(${TIME_LABELS.length}, 3rem)` }}>
                    {TIME_LABELS.map(time => (
                         <div key={time} className="text-right pr-2 text-xs text-brand-accent h-12 border-t border-brand-secondary pt-1 -mt-px">{time}</div>
                    ))}
                </div>
                <div 
                    className="col-start-2 col-end-9 grid grid-cols-7 relative"
                     style={{ gridTemplateRows: `repeat(${TIME_LABELS.length}, 3rem)`, backgroundSize: '1px 3rem', backgroundImage: 'linear-gradient(to bottom, transparent 2.95rem, #EFEBE6 2.95rem)'}}
                >
                   {/* Dotted lines for days */}
                   {[...Array(6)].map((_, i) => (
                       <div key={i} className="h-full border-r border-dashed border-brand-secondary" style={{ gridColumn: `${i+2} / span 1`, gridRow: '1 / -1' }}></div>
                   ))}

                   {/* Course Events */}
                   {events.map(event => {
                       const top = ((event.startMinutes - START_HOUR * 60) / 60) * 3; // 3rem per hour
                       const height = ((event.endMinutes - event.startMinutes) / 60) * 3;
                       const dayIndex = DAYS.indexOf(event.day);

                       if (dayIndex === -1 || height <= 0) return null;

                       return (
                           <div
                                key={event.id}
                                className={`absolute w-full p-1.5 rounded-lg text-xs overflow-hidden border ${event.color} select-none`}
                                style={{
                                    top: `${top}rem`,
                                    height: `${height}rem`,
                                    left: `${dayIndex * (100 / 7)}%`,
                                    width: `${100 / 7}%`,
                                }}
                           >
                               <p className="font-bold">{event.course.id}</p>
                               <p className="truncate">{event.course.title}</p>
                               <p className="font-semibold">{event.section.type}</p>
                           </div>
                       );
                   })}
                </div>
            </div>
        </div>
    );
};

export default ScheduleVisualizer;