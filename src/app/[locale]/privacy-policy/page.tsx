'use client';
import { Container, Title, Text, List, Divider, Stack } from '@mantine/core';
import classes from './privacy-policy.module.css';

export default function PrivacyPolicy() {
  return (
    <Container size="lg" className={classes.container}>
      <Title order={1} className={classes.title}>Privacy Policy</Title>
      <Text c="dimmed" mb="xl">Last updated: {new Date().toLocaleDateString()}</Text>

      <Stack gap="xl">
        <div className={classes.section}>
          <Title order={2} size="h3" mb="md">1. Introduction</Title>
          <Text>
            RAGI JI FOUNDATION (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy and is committed to protecting your personal data.
            This privacy policy explains how we collect, use, and safeguard your information when you visit our website.
          </Text>
        </div>

        <div className={classes.section}>
          <Title order={2} size="h3" mb="md">2. Information We Collect</Title>
          <Text mb="sm">We collect several types of information, including:</Text>
          <List>
            <List.Item>Personal information (name, email address, phone number) when you contact us</List.Item>
            <List.Item>Usage data (IP address, browser type, pages visited)</List.Item>
            <List.Item>Cookie data for website functionality and analytics</List.Item>
          </List>
        </div>

        <div className={classes.section}>
          <Title order={2} size="h3" mb="md">3. How We Use Your Information</Title>
          <Text mb="sm">We use the collected information for:</Text>
          <List>
            <List.Item>Responding to your inquiries and contact requests</List.Item>
            <List.Item>Improving our website and services</List.Item>
            <List.Item>Sending newsletters and updates (with your consent)</List.Item>
            <List.Item>Analyzing website usage and trends</List.Item>
          </List>
        </div>

        <div className={classes.section}>
          <Title order={2} size="h3" mb="md">4. Cookies Policy</Title>
          <Text mb="sm">
            We use cookies and similar tracking technologies to enhance your browsing experience.
            Types of cookies we use:
          </Text>
          <List>
            <List.Item><strong>Essential Cookies:</strong> Required for basic website functionality</List.Item>
            <List.Item><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</List.Item>
            <List.Item><strong>Preference Cookies:</strong> Remember your settings and preferences</List.Item>
          </List>
          <Text mt="sm">
            You can control cookie preferences through your browser settings. However, disabling certain cookies may affect website functionality.
          </Text>
        </div>

        <div className={classes.section}>
          <Title order={2} size="h3" mb="md">5. Data Security</Title>
          <Text>
            We implement appropriate security measures to protect your personal information.
            However, no internet transmission is completely secure, and we cannot guarantee absolute security.
          </Text>
        </div>

        <div className={classes.section}>
          <Title order={2} size="h3" mb="md">6. Your Rights</Title>
          <Text mb="sm">You have the right to:</Text>
          <List>
            <List.Item>Access your personal data</List.Item>
            <List.Item>Correct inaccurate data</List.Item>
            <List.Item>Request deletion of your data</List.Item>
            <List.Item>Withdraw consent for data processing</List.Item>
            <List.Item>Object to data processing</List.Item>
          </List>
        </div>

        <div className={classes.section}>
          <Title order={2} size="h3" mb="md">7. Contact Us</Title>
          <Text>
            For any questions about this privacy policy or our data practices, please contact us at:
          </Text>
          <Text mt="sm" fw={500}>
            Email: admin@ragijifoundation.com<br />
            Phone: +91 8827968035<br />
            Address: HOUSE NO-12 GRAM MAHAPURA POST KOTHD, Kothada B.O Kothada, DHAR 454449, Madhya Pradesh, India
          </Text>
        </div>

        <Divider my="xl" />

        <Text size="sm" c="dimmed">
          This privacy policy is subject to change. We will notify you of any changes by posting the new policy on this page.
        </Text>
      </Stack>
    </Container>
  );
} 