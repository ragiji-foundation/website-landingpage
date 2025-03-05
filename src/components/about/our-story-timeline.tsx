import { Box, Card, Group, Text, Title } from '@mantine/core';
import classes from './our-story-timeline.module.css';

interface TimelineEvent {
  year: string;
  title: string;
  centers: number;
  volunteers: number;
  children: number;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export function OurStoryTimeline({ events }: TimelineProps) {
  // Sort events by year in descending order (newest first)
  const sortedEvents = [...events].sort((a, b) => {
    return parseInt(b.year) - parseInt(a.year);
  });

  return (
    <div className={classes.timelineContainer}>
      {sortedEvents.map((event, index) => (
        <div key={`${event.year}-${index}`} className={classes.timelineEvent}>
          <div className={classes.timelineBullet}>
            <span>{event.year}</span>
          </div>
          <Card className={classes.timelineCard} padding="lg" radius="md" withBorder>
            <Title order={3} className={classes.timelineCardTitle}>
              {event.title}
            </Title>
            <div className={classes.timelineCardContent}>
              <Group gap="lg">
                <div className={classes.stat}>
                  <Title order={4}>{event.centers}</Title>
                  <Text size="sm">Centers</Text>
                </div>
                <div className={classes.stat}>
                  <Title order={4}>{event.volunteers}</Title>
                  <Text size="sm">Volunteers</Text>
                </div>
                <div className={classes.stat}>
                  <Title order={4}>{event.children}</Title>
                  <Text size="sm">Children</Text>
                </div>
              </Group>
            </div>
          </Card>
        </div>
      ))}
      <div className={classes.timelineLine}></div>
    </div>
  );
}
