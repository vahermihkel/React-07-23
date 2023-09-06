import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Button, TextField } from '@mui/material';

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_fum24bj', 'template_ld2lsyd', form.current, 'Xbn0xj_4LjNugxYGl')
      .then((result) => {
          console.log(result.text);
          form.current.reset();
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      {/* <label>Name</label> <br />
      <input type="text" name="from_name" /> <br /> */}
      <br />
      <TextField label="Name" variant="outlined" name="from_name" /> <br />
      {/* <label>Email</label> <br />
      <input type="email" name="from_email" /> <br /> */}
      <br />
      <TextField label="Email" variant="outlined" name="from_email" /> <br />
      {/* <label>Message</label> <br />
      <textarea name="message" /> <br /> */}
      <br />
      <TextField label="Message" variant="outlined" name="message" /> <br /> <br />
      <Button variant="outlined" type='submit'>Send</Button> <br />
    </form>
  );
};
