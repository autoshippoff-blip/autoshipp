import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { authorization_code, waba_id, phone_number_id } = body;

    // Here you would typically securely store these credentials in your database
    // and perhaps exchange the authorization_code for a longer-lived access token using Meta Graph API.
    
    console.log('Received WhatsApp Business credentials:', {
      waba_id,
      phone_number_id,
      authorization_code: authorization_code ? '***' : null
    });

    // Simulate network delay for UI consistency
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return NextResponse.json({ success: true, message: 'WhatsApp account connected successfully' });
  } catch (error) {
    console.error('Error in WhatsApp connect endpoint:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
