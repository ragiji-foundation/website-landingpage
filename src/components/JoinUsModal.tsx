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
  Modal,
} from '@mantine/core';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { apiClient, safeApiCall } from '@/utils/api-client';
import classes from './JoinUsModal.module.css';

interface JoinUsModalProps {
  opened: boolean;
  onClose: () => void;
}

export function JoinUsModal({ opened, onClose }: JoinUsModalProps) {
  const { t } = useLanguage();
  
  const ROLES = [
    { value: 'volunteer', label: t('volunteer.opportunities.teaching.title') },
    { value: 'full-time', label: t('careers.openings.type') },
    { value: 'internship', label: t('careers.internships.heading') },
    { value: 'partnership', label: t('joinus.partner.title') },
  ];

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
      await safeApiCall(
        () => apiClient.post('/join-us', formData),
        null,
        'join us form'
      );

      setStatus({
        type: 'success',
        message: t('joinus.form.success') || 'Thank you for your interest! We will contact you shortly.',
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
    } catch (error) {
      console.error("Form submission error:", error);

      setStatus({
        type: 'error',
        message: t('joinus.form.error') || 'Failed to submit. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="lg"
      padding="lg"
      radius="md"
      centered
      overlayProps={{
        blur: 3,
        opacity: 0.55,
      }}
      transitionProps={{
        transition: 'fade',
        duration: 200,
      }}
    >
      <form onSubmit={handleSubmit} className={classes.form}>
        <Stack gap="md">
          <Title order={3} size="h4">{t('joinus.banner.title')}</Title>
          <Text size="sm" c="dimmed">
            {t('joinus.banner.description')}
          </Text>

          <TextInput
            required
            label={t('contact.form.name')}
            placeholder={t('contact.form.name')}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={isSubmitting}
          />

          <Group grow>
            <TextInput
              required
              label={t('contact.form.email')}
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={isSubmitting}
            />

            <TextInput
              required
              label={t('contact.form.phone')}
              placeholder="+91 XXXXX XXXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              disabled={isSubmitting}
            />
          </Group>

          <Select
            required
            label={t('joinus.form.role')}
            placeholder={t('joinus.form.selectRole')}
            data={ROLES}
            value={formData.role}
            onChange={(value) => setFormData({ ...formData, role: value || '' })}
            disabled={isSubmitting}
          />

          <Textarea
            required
            label={t('joinus.form.motivation')}
            placeholder={t('joinus.form.motivationPlaceholder')}
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
              {t('common.close')}
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              variant="gradient"
              gradient={{ from: 'orange', to: 'red' }}
            >
              {isSubmitting ? t('common.submitting') : t('joinus.form.submit')}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
