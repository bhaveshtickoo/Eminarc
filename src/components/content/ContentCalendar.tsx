'use client';

import React from 'react';
import { Calendar as CalendarIcon, Clock, Plus, GripVertical } from 'lucide-react';

export interface CalendarDay {
  day: string;
  date: string;
  posts: {
    id: string;
    title: string;
    type: string;
    platform: string;
    time: string;
    status: 'Published' | 'Scheduled' | 'Draft';
  }[];
}

export const weeklySchedule: CalendarDay[] = [
  {
    day: 'Monday',
    date: 'Aug 4',
    posts: [
      {
        id: 'cal-1',
        title: 'Why Growth OS Architecture Replaces Fragmented SaaS',
        type: 'LinkedIn Post',
        platform: 'LinkedIn',
        time: '09:00 AM',
        status: 'Scheduled',
      },
    ],
  },
  {
    day: 'Tuesday',
    date: 'Aug 5',
    posts: [
      {
        id: 'cal-2',
        title: 'Scaling B2B AI Visibility Citation Scores by 38%',
        type: 'Medium Article',
        platform: 'Medium',
        time: '02:30 PM',
        status: 'Scheduled',
      },
    ],
  },
  {
    day: 'Wednesday',
    date: 'Aug 6',
    posts: [
      {
        id: 'cal-3',
        title: 'Systemic Founder: Content Engine Workflows',
        type: 'Reddit Post',
        platform: 'Reddit',
        time: '11:15 AM',
        status: 'Draft',
      },
    ],
  },
  {
    day: 'Thursday',
    date: 'Aug 7',
    posts: [
      {
        id: 'cal-4',
        title: '5 AI Search Optimization Frameworks',
        type: 'LinkedIn Carousel',
        platform: 'LinkedIn',
        time: '10:00 AM',
        status: 'Draft',
      },
    ],
  },
  {
    day: 'Friday',
    date: 'Aug 8',
    posts: [
      {
        id: 'cal-5',
        title: 'Weekly Founder Review & Growth OS Wins',
        type: 'Newsletter',
        platform: 'Substack',
        time: '04:00 PM',
        status: 'Draft',
      },
    ],
  },
];

export const ContentCalendar: React.FC = () => {
  return (
    <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-4 w-4 text-[#18181B]" />
          <h3 className="font-sans font-bold text-lg text-[#111111]">
            Weekly Publishing Schedule (Week 32)
          </h3>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#2D6A4F] bg-[#EDF6F0] px-2.5 py-1 rounded-full border border-[#C8E4D0]">
          5 POSTS PACED
        </span>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {weeklySchedule.map((dayItem) => (
          <div
            key={dayItem.day}
            className="flex flex-col rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-4 min-h-[280px] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]"
          >
            {/* Day Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D6]/60 mb-3">
              <div>
                <span className="font-sans font-bold text-sm text-[#111111]">
                  {dayItem.day}
                </span>
                <span className="font-mono text-[10px] text-[#716D64] block">
                  {dayItem.date}
                </span>
              </div>
              <button
                type="button"
                className="p-1 rounded-lg hover:bg-[#F7F4EE] text-[#716D64] hover:text-[#111111] transition-colors"
                title="Add post for this day"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Post Cards in Slot */}
            <div className="flex-1 space-y-2">
              {dayItem.posts.map((post) => (
                <div
                  key={post.id}
                  className="group relative flex flex-col justify-between rounded-lg bg-[#FCFAF7] border border-[#E5E0D6] p-3 text-xs shadow-sm hover:border-[#18181B] transition-all cursor-grab active:cursor-grabbing"
                >
                  <div className="flex items-start justify-between gap-1 mb-1.5">
                    <span className="font-sans font-semibold text-[#111111] line-clamp-2 leading-snug">
                      {post.title}
                    </span>
                    <GripVertical className="h-3 w-3 text-[#9E988D] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="flex items-center justify-between font-mono text-[9px] text-[#716D64] pt-2 border-t border-[rgba(0,0,0,0.04)]">
                    <span className="bg-[#EFEAE1] text-[#18181B] px-1.5 py-0.2 rounded font-medium">
                      {post.platform}
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-2.5 w-2.5" />
                      <span>{post.time}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
