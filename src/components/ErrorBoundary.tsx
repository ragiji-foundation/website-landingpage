'use client';
import { Component, ReactNode } from 'react';
import { Alert, Button, Stack, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Something went wrong"
          color="red"
          variant="filled"
        >
          <Stack>
            <Text>We're having trouble loading this content.</Text>
            <Button
              onClick={() => this.setState({ hasError: false })}
              variant="white"
              size="xs"
            >
              Try again
            </Button>
          </Stack>
        </Alert>
      );
    }

    return this.props.children;
  }
}
