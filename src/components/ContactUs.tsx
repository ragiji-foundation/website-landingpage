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
import { useLanguage } from '@/context/LanguageContext';
import { apiClient, safeApiCall } from '@/utils/api-client';
import classes from './ContactUs.module.css';
import { useState } from 'react';

export function ContactUs() {
  const { t } = useLanguage();
  
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
      await safeApiCall(
        () => apiClient.post('/contact', formData),
        null,
        'contact form'
      );

      setSubmitStatus({
        type: 'success',
        message: t('contact.form.success')
      });
      setFormData({ email: '', name: '', subject: '', message: '' });

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: t('contact.form.error')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
        <div>
          <Title className={classes.title}>{t('contact.banner.title')}</Title>
          <Text className={classes.description} mt="sm" mb={30}>
            {t('contact.info.description')}
          </Text>
          <ContactIconsList
            data={[
              {
                title: t('contact.info.email'),
                description: t('footer.getintouch.email'),
                icon: 'mail'
              },
              {
                title: t('contact.info.phone'),
                description: t('footer.getintouch.phone'),
                icon: 'phone',
              },
              {
                title: t('contact.info.address'),
                description: `${t('footer.organization.address.line1')} ${t('footer.organization.address.line2')} ${t('footer.organization.address.line3')}`,
                icon: 'location',
              },
              {
                title: t('contact.info.hours'),
                description: t('contact.info.hoursValue'),
                icon: 'clock',
              },
            ]}
          />
        </div>

        <Paper shadow="md" radius="lg" p="xl" className={classes.form}>
          <form onSubmit={handleSubmit}>
            <TextInput
              label={t('contact.form.email')}
              placeholder="your@email.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              classNames={{ input: classes.input, label: classes.inputLabel }}
              disabled={isSubmitting}
            />
            <TextInput
              label={t('contact.form.name')}
              placeholder={t('contact.form.name')}
              mt="md"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              classNames={{ input: classes.input, label: classes.inputLabel }}
              disabled={isSubmitting}
            />
            <TextInput
              label={t('contact.form.subject')}
              placeholder={t('contact.form.subject')}
              mt="md"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              classNames={{ input: classes.input, label: classes.inputLabel }}
              disabled={isSubmitting}
            />
            <Textarea
              required
              label={t('contact.form.message')}
              placeholder={t('contact.form.messagePlaceholder')}
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
                {isSubmitting ? t('common.submitting') : t('contact.form.submit')}
              </Button>
            </Group>
          </form>
        </Paper>
      </SimpleGrid>
    </div>
  );
}