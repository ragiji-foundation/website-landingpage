import { Box } from '@mantine/core';
import { keyframes } from '@emotion/react';
import Image from 'next/image';

const float = keyframes({
  '0%': { transform: 'translateY(0px)' },
  '50%': { transform: 'translateY(-10px)' },
  '100%': { transform: 'translateY(0px)' }
});

export function WhatsAppButton() {
  const phoneNumber = "918827968035";
  const message = encodeURIComponent(
    "Hi! I would like to know more about your services. Please help me with more information."
  );

  return (
    <Box
      component="a"
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 1000,
        cursor: 'pointer',
        animation: `${float} 3s ease-in-out infinite`,
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.1)',
        },
      }}
    >
      <Image
        src="/whatsapp.gif"
        alt="WhatsApp Chat"
        width={60}
        height={60}
      />
    </Box>
  );
}
