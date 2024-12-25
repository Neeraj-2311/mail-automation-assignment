"use client"
import { useEffect, useState } from 'react';
import { LoadingSpinner } from './utils/loadingSpinner';
import { ScheduleListItem } from './scheduleListItem';

export const ScheduleList = () => {
  const [scheduledMailings, setScheduledMailings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchScheduledMailings = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/get-scheduled-mailings');
      if (!response.ok) {
        throw new Error('Failed to fetch scheduled mailings');
      }
      const data = await response.json();
      setScheduledMailings(data);
    } catch (error) {
      console.error('Error fetching scheduled mailings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScheduledMailings();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-600 whitespace-nowrap mr-2">
            Scheduled Mails
          </h2>
          <div className="flex-grow border-t-2 border-gray-300"></div>
        </div>
        <button
          onClick={fetchScheduledMailings}
          className="ml-4 px-3 sm:px-4 py-0.5 sm:py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Refresh
        </button>
      </div>
      {loading ? (
        <div className='my-8 w-full flex items-center justify-center'>
          <LoadingSpinner/>
        </div>
      ) : (
        <ul className="space-y-4">
          {scheduledMailings.map((mailing, id) => (
            <ScheduleListItem mailing={mailing} key={id}/>
          ))}
        </ul>
      )}
    </div>
  );
};