"use client";
import { useState } from 'react';
import { LoadingSpinner } from './utils/loadingSpinner';

export default function CreateModal({ isOpen, onClose }) {
  const [mailers, setMailers] = useState([]);
  const [lists, setLists] = useState([]);
  const [selectedMailer, setSelectedMailer] = useState('');
  const [selectedList, setSelectedList] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [isSaving, setIsSaving] = useState(false)

  const fetchMailers = async () => {
    if (mailers.length === 0) {
      try {
        const response = await fetch('/api/get-mailers');
        if (!response.ok) {
          throw new Error('Failed to fetch mailers');
        }
        const data = await response.json();
        setMailers(data);
      } catch (error) {
        console.error('Error fetching mailers:', error);
      }
    }
  };

  const fetchLists = async () => {
    if (lists.length === 0) {
      try {
        const response = await fetch('/api/get-lists');
        if (!response.ok) {
          throw new Error('Failed to fetch lists');
        }
        const data = await response.json();
        setLists(data);
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    }
  };

  const today = new Date();
  const currentDate = today.toISOString().split("T")[0];
  const currentTime = today.toTimeString().split(" ")[0].slice(0, 5);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const scheduledDateTime = `${scheduledDate}T${scheduledTime}`;
    setIsSaving(true);
    try {
      const response = await fetch('/api/schedule-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mailer: selectedMailer,
          list: selectedList,
          scheduledDateTime: scheduledDateTime
        })
      })
      if(response.ok){
        console.log('Mail scheduled successfully');
      }
    } catch (error) {
      console.error('Error scheduling mail', error);
    } finally{
      setTimeout(() => {
        setIsSaving(false)
        onClose();
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg relative w-96">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 text-2xl hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-xl mb-4">Schedule a Mail</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Select Mailer</label>
            <select
              value={selectedMailer}
              onChange={(e) => setSelectedMailer(e.target.value)}
              onClick={fetchMailers}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              required
            >
              <option value="" disabled>
                -- Select a Mailer --
              </option>
              {mailers.map((mailer) => (
                <option key={mailer.id} value={mailer.id}>
                  {mailer.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Select List</label>
            <select
              value={selectedList}
              onChange={(e) => setSelectedList(e.target.value)}
              onClick={fetchLists}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              required
            >
              <option value="" disabled>
                -- Select a List --
              </option>
              {lists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Select Date and Time</label>
            <div className="mt-1 flex flex-row space-x-4">
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="block w-full border border-gray-300 rounded p-2"
                required
                min={currentDate}
              />
              <input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="block w-full border border-gray-300 rounded p-2"
                required
                min={scheduledDate === currentDate ? currentTime:undefined}
              />
            </div>
          </div>
          <button
            type="submit" disabled={isSaving}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isSaving ? <div className='flex items-center gap-x-2'><LoadingSpinner small={true}/>Saving...</div>: 'Schedule Mail'}
          </button>
        </form>
      </div>
    </div>
  );
}