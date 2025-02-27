'use client';
import {
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  Stack,
  Title,
  Select,
} from '@mantine/core';
import { useState } from 'react';
import axios from 'axios';
import classes from './JoinUsModal.module.css';

const ROLES = [
  { value: 'volunteer', label: 'Volunteer' },
  { value: 'full-time', label: 'Full Time Role' },
  { value: 'internship', label: 'Internship' },
  { value: 'partnership', label: 'NGO Partnership' },
];

export function JoinUsModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });
  
    try {
      const response = await axios.post('https://admin.ragijifoundation.com/api/join-us', formData);
  
      if (response.status === 201) { // Check for successful response
        setStatus({
          type: 'success',
          message: 'Thank you for your interest! We will contact you shortly.',
        });
  
        // Clear form after success
        setFormData({
          name: '',
          email: '',
          phone: '',
          role: '',
          message: '',
        });
  
        setTimeout(onClose, 2000); // Close modal after success
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Form submission error:", error.response?.data || error.message);
      } else {
        console.error("Form submission error:", error);
      }
  
      setStatus({
        type: 'error',
        message: axios.isAxiosError(error) && error.response?.data?.error ? error.response.data.error : 'Failed to submit. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Stack gap="md">
        <Title order={3} size="h4">Join Our Mission</Title>
        <Text size="sm" c="dimmed">
          Make a difference in the lives of others by becoming part of our team
        </Text>

        <TextInput
          required
          label="Full Name"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          disabled={isSubmitting}
        />

        <Group grow>
          <TextInput
            required
            label="Email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={isSubmitting}
          />

          <TextInput
            required
            label="Phone"
            placeholder="+91 XXXXX XXXXX"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            disabled={isSubmitting}
          />
        </Group>

        <Select
          required
          label="I want to join as"
          placeholder="Select role"
          data={ROLES}
          value={formData.role}
          onChange={(value) => setFormData({ ...formData, role: value || '' })}
          disabled={isSubmitting}
        />

        <Textarea
          required
          label="Why do you want to join us?"
          placeholder="Tell us about your motivation and how you can contribute..."
          minRows={3}
          maxRows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          disabled={isSubmitting}
        />

        {status.type && (
          <Text c={status.type === 'success' ? 'teal' : 'red'} size="sm" ta="center">
            {status.message}
          </Text>
        )}

        <Group justify="flex-end" mt="md">
          <Button variant="light" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isSubmitting}
            variant="gradient"
            gradient={{ from: 'orange', to: 'red' }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
