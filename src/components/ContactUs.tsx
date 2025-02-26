'use client';
import {
  Button,
  Group,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
  Title,
  Paper
} from '@mantine/core';
import { ContactIconsList } from './ContactIcons';
import classes from './ContactUs.module.css';
import { useState } from 'react';
import axios from 'axios';

export function ContactUs() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      await axios.post('https://admin.ragijifoundation.com/api/contact', formData);

      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message. We will get back to you soon!'
      });
      setFormData({ email: '', name: '', subject: '', message: '' });

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
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
        </div>

        <Paper shadow="md" radius="lg" p="xl" className={classes.form}>
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Email"
              placeholder="your@email.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              classNames={{ input: classes.input, label: classes.inputLabel }}
              disabled={isSubmitting}
            />
            <TextInput
              label="Name"
              placeholder="Your Name"
              mt="md"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              classNames={{ input: classes.input, label: classes.inputLabel }}
              disabled={isSubmitting}
            />
            <TextInput
              label="Subject"
              placeholder="Subject"
              mt="md"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              classNames={{ input: classes.input, label: classes.inputLabel }}
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />

            {submitStatus.type && (
              <Text
                mt="sm"
                c={submitStatus.type === 'success' ? 'green' : 'red'}
                size="sm"
              >
                {submitStatus.message}
              </Text>
            )}

            <Group justify="flex-end" mt="md">
              <Button
                type="submit"
                className={classes.control}
                loading={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send message'}
              </Button>
            </Group>
          </form>
        </Paper>
      </SimpleGrid>
    </div>
  );
}