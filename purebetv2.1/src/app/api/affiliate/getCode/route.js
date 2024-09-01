import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://ogs3htok73.execute-api.ap-northeast-1.amazonaws.com/v2/affiliate/getCode?address=${address}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch codes:', error);
    return NextResponse.json({ error: 'Failed to fetch codes' }, { status: 500 });
  }
}