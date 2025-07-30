'use client';

import { Modal, Image, ActionIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useMediaQuery } from '@mantine/hooks';

interface LightboxProps {
  opened: boolean;
  onClose: () => void;
  imageUrl: string;
  title?: string;
}

/**
 * A lightbox component for displaying images in a modal
 */
export function Lightbox({ opened, onClose, imageUrl, title }: LightboxProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Lock body scroll when modal is open
  useEffect(() => {
    if (opened) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px'; // Prevent layout shift from scrollbar
      
      // Also set viewport height to prevent mobile browser UI issues
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [opened]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      padding={0}
      size={isMobile ? "100%" : "90%"}
      withCloseButton={false}
      centered
      zIndex={999999}
      styles={{
        body: {
          padding: 0,
          height: 'auto',
        },
        content: {
          width: isMobile ? '100vw' : '90vw',
          height: isMobile ? '100vh' : '90vh',
          maxWidth: isMobile ? '100vw' : '90vw',
          maxHeight: isMobile ? '100vh' : '90vh',
          margin: isMobile ? 0 : undefined,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        },
        inner: {
          padding: 0,
        },
      }}
    >
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <ActionIcon
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 100099,
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            border: '2px solid rgba(255, 255, 255, 0.5)',
          }}
          radius="xl"
          variant="filled"
          size="xl"
        >
          <IconX size={24} />
        </ActionIcon>
        
        <Image
          src={imageUrl}
          alt={title || 'Gallery image'}
          fit="contain"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
          fallbackSrc="/images/fallbacks/gallery-image.svg"
        />
      </div>
    </Modal>
  );
}