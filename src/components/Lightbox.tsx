'use client';

import { Modal, Image, ActionIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { useEffect } from 'react';

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
  // Lock body scroll when modal is open
  useEffect(() => {
    if (opened) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px'; // Prevent layout shift from scrollbar
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
      size="xl"
      withCloseButton={false}
      centered
      zIndex={999999}
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      <div style={{ position: 'relative' }}>
        <ActionIcon
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 60,
            right: 10,
            zIndex: 100099,
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            border: '2px solid rgba(255, 255, 255, 0.3)',
          }}
          radius="xl"
          variant="filled"
          size="lg"
        >
          <IconX size={18} />
        </ActionIcon>
        
        <Image
          src={imageUrl}
          alt={title || 'Gallery image'}
          fit="contain"
          height="80vh"
          fallbackSrc="/images/fallbacks/gallery-image.svg"
        />
      </div>
    </Modal>
  );
}