import React from 'react';
import { Course } from '../types';

interface ScheduleVisualizerProps {
    courses: Course[];
}

const DAYS = ['M', 'T', 'W', 'Th', 'F'];
const TIME_LABELS = Array.from({ length: 13 }, (_, i) => `${i + 8}:00`); // 8am to 8pm
const START_HOUR = 8;

const COURSE_COLORS = [
    'bg-lehigh-gold/80 border-lehigh-gold',
    'bg-lehigh-red/80 border-lehigh-red',
    'bg-lehigh-green/80 border-lehigh-green',
    'bg-blue-500/80 border-blue-500',
    'bg-indigo-500/80 border-indigo-500',
    'bg-purple-500/80 border-purple-500',
    'bg-pink-500/80 border-pink-500',
    'bg-teal-500/80 border-teal-500',
];

const parseTime = (timeStr: string) => {
    const [daysStr, timeRange] = timeStr.split(' ');
    const [startTimeStr, endTimeStr] = timeRange.split('-');

    const days = daysStr.match(/Th|M|T|W|F/g) || [];

    const parseTime12hr = (t: string) => {
        const isPM = t.includes('PM');
        const [hour, minute] = t.replace(/AM|PM/, '').split(':').map(Number);
        let finalHour = hour;
        if (isPM && hour < 12) {
            finalHour += 12;
        }
        if (!isPM && hour === 12) { // 12 AM
            finalHour = 0;
        }
        return finalHour * 60 + minute;
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
        <div className="bg-lehigh-darker-brown p-4 rounded-lg overflow-x-auto">
            <div className="grid grid-cols-[auto_repeat(5,minmax(0,1fr))] min-w-[700px]">
                {/* Headers */}
                <div className="sticky left-0 bg-lehigh-darker-brown z-10"></div>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                    <div key={day} className="text-center font-bold text-lehigh-gold pb-2">{day}</div>
                ))}

                {/* Grid layout */}
                <div className="row-span-1 col-start-1 col-end-2 grid grid-rows-12">
                    {TIME_LABELS.slice(0,-1).map(time => (
                         <div key={time} className="text-right pr-2 text-xs text-lehigh-light-gold h-12 border-t border-lehigh-brown/50">{time}</div>
                    ))}
                </div>
                <div 
                    className="col-start-2 col-end-7 grid grid-cols-5 grid-rows-12 relative"
                    style={{ backgroundSize: '1px 3rem', backgroundImage: 'linear-gradient(to bottom, transparent 2.95rem, rgba(147, 112, 219, 0.1) 2.95rem)'}}
                >
                   {/* Dotted lines for days */}
                   {[...Array(4)].map((_, i) => (
                       <div key={i} className="h-full border-r border-dashed border-lehigh-brown/50" style={{ gridColumn: `${i+1} / span 1`, gridRow: '1 / -1' }}></div>
                   ))}

                   {/* Course Events */}
                   {events.map(event => {
                       const top = ((event.startMinutes - START_HOUR * 60) / 60) * 3; // 3rem per hour
                       const height = ((event.endMinutes - event.startMinutes) / 60) * 3;
                       const dayIndex = DAYS.indexOf(event.day);

                       if (dayIndex === -1) return null;

                       return (
                           <div
                                key={event.id}
                                className={`absolute w-full p-2 rounded-lg text-white text-xs overflow-hidden border ${event.color} select-none`}
                                style={{
                                    top: `${top}rem`,
                                    height: `${height}rem`,
                                    left: `${dayIndex * 20}%`, // 100% / 5 days = 20% per day
                                    width: '20%',
                                }}
                           >
                               <p className="font-bold">{event.course.id}</p>
                               <p className="truncate">{event.course.title}</p>
                               <p className="text-lehigh-gold/90">{event.section.type}</p>
                           </div>
                       );
                   })}
                </div>
            </div>
        </div>
    );
};

export default ScheduleVisualizer;