import { scheduledMailings } from '@/sample/scheduledMailing';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const sortedMailings = [...scheduledMailings].sort(
      (a, b) => new Date(a.scheduledDateTime) - new Date(b.scheduledDateTime)
    );
    return NextResponse.json(sortedMailings, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}