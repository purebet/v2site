import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');
  const code = searchParams.get('code');

  if (!address || !code) {
    return NextResponse.json({ error: 'Address and code are required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://ogs3htok73.execute-api.ap-northeast-1.amazonaws.com/v2/affiliate/new?address=${address}&code=${code}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to link code:', error);
    return NextResponse.json({ error: 'Failed to link code' }, { status: 500 });
  }
}