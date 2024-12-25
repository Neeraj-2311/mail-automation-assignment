import { mailerList } from '@/sample/mailerList';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = mailerList;
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
