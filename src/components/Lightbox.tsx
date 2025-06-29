'use client';

import { Modal, Image, ActionIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

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
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      padding={0}
      size="xl"
      withCloseButton={false}
      centered
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
            top: 10,
            right: 10,
            zIndex: 10,
            background: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
          }}
          radius="xl"
          variant="filled"
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