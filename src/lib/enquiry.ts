import { contact } from '../data/contact';
import { log } from './log';

export interface Enquiry {
  name: string;
  email: string;
  phone: string;
  message: string;
}

/** Emails the enquiry to the inbox linked to `contact.web3formsKey` through Web3Forms. Throws on failure. */
export async function sendEnquiry(enquiry: Enquiry): Promise<void> {
  log('info', `Sending enquiry from ${enquiry.name} <${enquiry.email}>`);
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: contact.web3formsKey,
        subject: `New website enquiry from ${enquiry.name}`,
        from_name: 'Starrmount website',
        name: enquiry.name,
        email: enquiry.email,
        phone: enquiry.phone,
        products: enquiry.message,
      }),
    });
    const result = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
    if (!res.ok || result.success !== true) {
      throw new Error(`Web3Forms ${res.status}: ${result.message ?? 'no message'}`);
    }
    log('info', 'Enquiry sent');
  } catch (err) {
    log('error', 'Enquiry failed to send', err);
    throw err;
  }
}
