import React from 'react';
import { Container, Title, Text, Button, Stack } from '@mantine/core';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <Container size="md" py="xl">
          <Stack align="center" gap="md">
            <Title>Something went wrong</Title>
            <Text>We&apos;re working to fix this issue. Meanwhile, you can:</Text>
            <Button onClick={() => this.setState({ hasError: false })}>
              Try again
            </Button>
          </Stack>
        </Container>
      );
    }

    return this.props.children;
  }
}
