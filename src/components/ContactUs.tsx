'use client';
import { IconBrandInstagram, IconBrandFacebook, IconBrandYoutube } from '@tabler/icons-react';
import {
  ActionIcon,
  Button,
  Group,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { ContactIconsList } from './ContactIcons';
import classes from './ContactUs.module.css';
import { useState } from 'react';

const social = [IconBrandFacebook, IconBrandYoutube, IconBrandInstagram];

export function ContactUs() {
  const icons = social.map((Icon, index) => (
    <ActionIcon key={index} size={28} className={classes.social} variant="transparent">
      <Icon size={22} stroke={1.5} />
    </ActionIcon>
  ));

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ email: '', name: '', subject: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className={classes.wrapper}>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
        <div>
          <Title className={classes.title}>Contact us</Title>
          <Text className={classes.description} mt="sm" mb={30}>
            Leave your message and we will get back to you within 24 hours
          </Text>
          <ContactIconsList
            data={[
              {
                title: 'Email',
                description: 'admin@ragijifoundation.com',
                icon: 'mail'
              },
              {
                title: 'Phone',
                description: '+91 8827968035',
                icon: 'phone',
              },
              {
                title: 'Address',
                description: 'HOUSE NO-12 GRAM MAHAPURA POST KOTHD, Kothada B.O Kothada, DHAR 454449, Madhya Pradesh, India',
                icon: 'location',
              },
              {
                title: 'Working hours',
                description: 'Monday - Saturday: 9:00 AM - 6:00 PM',
                icon: 'clock',
              },
            ]}
          />

          <Group mt="xl">{icons}</Group>
        </div>

        <div className={classes.form}>
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Email"
              placeholder="your@email.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />
            <TextInput
              label="Name"
              placeholder="Your Name"
              mt="md"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />
            <TextInput
              label="Subject"
              placeholder="Subject"
              mt="md"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />
            <Textarea
              required
              label="Your message"
              placeholder="Please type your message here"
              minRows={4}
              mt="md"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit" className={classes.control}>Send message</Button>
            </Group>
          </form>
        </div>
      </SimpleGrid>
    </div>
  );
}