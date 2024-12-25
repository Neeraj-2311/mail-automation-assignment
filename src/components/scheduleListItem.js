"use client"
import { useEffect, useState } from 'react';
import { formatDateTime } from './utils/formatDateTime';

export const ScheduleListItem = ({ mailing }) => {
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const checkExpiration = () => {
      const currentTime = new Date();
      const scheduledTime = new Date(mailing.scheduledDateTime);
      if (scheduledTime <= currentTime) {
        setIsExpired(true);
        clearInterval(intervalId);
        sendEmail()
      }
    };

    const intervalId = setInterval(checkExpiration, 60000);

    checkExpiration();

    return () => clearInterval(intervalId);
  }, [mailing.scheduledDateTime]);

  const sendEmail = async () => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mailingId: mailing.id }),
      });
      if (!response.ok) {
        console.error('Failed to send email');
      }
      console.log(`Email sent for mailing ID: ${mailing.id}`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <li className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <h3 className="sm:text-lg font-medium text-gray-700 w-full truncate" title={mailing.mailerName}>
        {mailing.mailerName}
      </h3>
      <p className="text-gray-500 w-full truncate">
        List: {mailing.listName}
      </p>
      <div className={`mt-2 inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs sm:text-sm font-semibold rounded-sm ${isExpired ? 'opacity-50' : ''}`}>
        {formatDateTime(mailing.scheduledDateTime)}
      </div>
    </li>
  );
};