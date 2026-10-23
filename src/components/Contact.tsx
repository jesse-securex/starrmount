import { useEffect, useRef, useState, type FormEvent } from 'react';
import { contact } from '../data/contact';
import { sendEnquiry, type Enquiry } from '../lib/enquiry';
import { MailIcon, MapPinIcon, PhoneIcon } from './Icons';

type FieldErrors = Partial<Record<keyof Enquiry, string>>;

const emptyEnquiry: Enquiry = { name: '', email: '', phone: '', message: '' };

function validate(values: Enquiry): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim()) errors.name = 'Please enter your full name.';
  if (!values.email.trim()) errors.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (!values.phone.trim()) errors.phone = 'Please enter your phone number.';
  if (!values.message.trim()) errors.message = 'Please tell us which products you are interested in.';
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState<Enquiry>(emptyEnquiry);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const thanksRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (status === 'sent') thanksRef.current?.focus();
  }, [status]);

  const update = (field: keyof Enquiry) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((errs) => ({ ...errs, [field]: undefined }));
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof Enquiry)[])[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setStatus('sending');
    try {
      await sendEnquiry(values);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  function reset() {
    setValues(emptyEnquiry);
    setErrors({});
    setStatus('idle');
  }

  const fieldProps = (field: keyof Enquiry) => ({
    id: `contact-${field}`,
    name: field,
    value: values[field],
    onChange: update(field),
    required: true,
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `contact-${field}-error` : undefined,
  });

  const errorText = (field: keyof Enquiry) =>
    errors[field] && (
      <p id={`contact-${field}-error`} className="field__error">
        {errors[field]}
      </p>
    );

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container contact">
        <div className="contact__info" data-reveal>
          <p className="kicker">Get in touch</p>
          <h2 id="contact-title" className="section__title">
            Contact us
          </h2>
          <p className="section__intro">Tell us what equipment you need and we will send you a quote.</p>
          <ul className="contact__details">
            <li>
              <PhoneIcon className="contact__icon" />
              <span>
                <span className="visually-hidden">Phone: </span>
                {contact.phone}
              </span>
            </li>
            <li>
              <MailIcon className="contact__icon" />
              <span>
                <span className="visually-hidden">Email: </span>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </span>
            </li>
            <li>
              <MapPinIcon className="contact__icon" />
              <span>
                <span className="visually-hidden">Address: </span>
                {contact.address}
              </span>
            </li>
          </ul>
        </div>

        <div className="panel contact__panel" data-reveal>
          {status === 'sent' ? (
            <div className="contact__thanks" ref={thanksRef} tabIndex={-1}>
              <h3 className="contact__thanks-title">Thank you</h3>
              <p>Your message has been received. We will get back to you with a quote.</p>
              <button type="button" className="btn btn--outline-navy" onClick={reset}>
                Send another message
              </button>
            </div>
          ) : (
            <form ref={formRef} className="form" noValidate onSubmit={handleSubmit}>
              <div className="form__row">
                <div className="field">
                  <label htmlFor="contact-name">Full name</label>
                  <input type="text" autoComplete="name" {...fieldProps('name')} />
                  {errorText('name')}
                </div>
                <div className="field">
                  <label htmlFor="contact-email">Email</label>
                  <input type="email" autoComplete="email" {...fieldProps('email')} />
                  {errorText('email')}
                </div>
                <div className="field">
                  <label htmlFor="contact-phone">Phone</label>
                  <input type="tel" autoComplete="tel" {...fieldProps('phone')} />
                  {errorText('phone')}
                </div>
              </div>
              <div className="field">
                <label htmlFor="contact-message">Which products are you interested in?</label>
                <textarea rows={5} {...fieldProps('message')} />
                {errorText('message')}
              </div>
              {status === 'error' && (
                <p className="field__error" role="alert">
                  Sorry, your message could not be sent. Please try again.
                </p>
              )}
              <button type="submit" className="btn btn--gold" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
