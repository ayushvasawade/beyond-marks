// app/api/webhooks/clerk/route.ts

import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { syncUserWithDb } from '@/services/userService';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env.local');
  }

  // Get the headers
  // The 'headers()' function from 'next/headers' is synchronous and does not return a promise.
  // The error you saw is likely a temporary issue with the TS server. This is the correct usage.
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: "Missing Svix headers" }, { status: 400 });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      // FIX: Convert `null` to `undefined` to match 'svix' library's expected types
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    // FIX: Using NextResponse for structured JSON error responses
    return NextResponse.json({ error: 'Could not verify webhook' }, { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    if (!id || !email_addresses) {
      return NextResponse.json({ error: 'Missing required user data' }, { status: 400 });
    }

    try {
      await syncUserWithDb({
        clerkId: id,
        email: email_addresses[0].email_address,
        firstName: first_name || undefined,
        lastName: last_name || undefined,
        imageUrl: image_url || undefined,
      });

      return NextResponse.json({ message: 'User successfully synced with database.' }, { status: 201 });

    } catch (err) {
      console.error("Error in webhook while syncing user:", err);
      return NextResponse.json({ error: 'Failed to sync user to database' }, { status: 500 });
    }
  }

  return NextResponse.json({ message: 'Webhook received' }, { status: 200 });
}