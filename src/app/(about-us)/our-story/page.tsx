'use client';
import React from 'react'
import { Banner } from '@/components/Banner'
import OurStory from '@/components/about/our-story'
import { Box } from '@mantine/core'
import { Container, Title, Text, Image, SimpleGrid, Card, Group,  Timeline, Badge  } from "@mantine/core";
import classes from './our-story.module.css';


export default function OurStoryPage() {

  const timelineData = [
    { year: '2011', title: 'REGISTERED AS NGO', centers: 1, volunteers: 10, children: 60 },
    { year: '2013', title: 'APNASAAMAAN.COM', centers: 3, volunteers: 40, children: 300 },
    { year: '2014', title: 'FOOTPATHSHAALA', centers: 8, volunteers: 60, children: 500 },
    { year: '2015', title: 'GRANTH ON RATH', centers: 15, volunteers: 150, children: 800 },
    { year: '2017', title: 'SAMARTH', centers: 22, volunteers: 250, children: 1300 },
    { year: '2018', title: 'PROJECT UDAAN', centers: 33, volunteers: 400, children: 2000 },
    { year: '2019', title: 'PROJECT UDAAN', centers: 33, volunteers: 400, children: 2000 },
    { year: '2020', title: 'COVID-19 RELIEF', centers: 44, volunteers: 500, children: 2500 }
  ];

  return (
    <main>
      <Banner
        type="about"
        title="Our Story"
        description="Journey of transforming lives through education and empowerment"
        backgroundImage="/banners/our-story-banner.jpg"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'About', link: '/about' },
          { label: 'Our Story' }
        ]}
      />
      <Box bg="var(--mantine-color-gray-0)" py="xl">
        <OurStory />
      </Box>

      <Container size="lg" py="xl">
      {/* The Model Section */}
      <div style={{ backgroundColor: "#333", padding: "3rem", borderRadius: "10px", color: "#fff" }}>
        <Title order={2} ta="center" mb="md">
          ⭐ THE MODEL
        </Title>
        <SimpleGrid cols={2} spacing="xl">
          <div>
            <Text size="lg">
              • UPAY NGO empowers underprivileged communities through Education and Skill Development.  
              • Children are taught through open classroom programs using various activities.  
              • Currently, we have 44 centers across the country impacting 2.5 Lacs+ beneficiaries.  
            </Text>
          </div>
          <Image src="/path-to-model-image.jpg" alt="The Model Image" radius="md" />
        </SimpleGrid>
      </div>

      {/* Our Vision & Mission Section */}
      <div style={{ paddingTop: "3rem" }}>
        <Title order={2} ta="center" mb="md">
          ⭐ OUR VISION & MISSION
        </Title>
        <SimpleGrid cols={2} spacing="xl">
          <Card shadow="sm" padding="lg" radius="md">
            <Group justify="center">
              <Image src="/path-to-vision-icon.jpg" width={80} height={80} alt="Vision Icon" />
            </Group>
            <Text ta="center" mt="md">
              <strong>The vision of UPAY NGO</strong>  
              <br />
              “A future where every child has a dignified childhood and equal opportunity.”
            </Text>
          </Card>
          
          <Card shadow="sm" padding="lg" radius="md">
            <Group ta="center">
              <Image src="/path-to-mission-icon.jpg" width={80} height={80} alt="Mission Icon" />
            </Group>
            <Text ta="center" mt="md">
              <strong>Our Mission</strong>  
              <br />
              “To develop a sustainable ecosystem for the underprivileged by enabling, educating, and empowering.”
            </Text>
          </Card>
        </SimpleGrid>

        <div className={classes.timelineContainer}>
      <h2 className={classes.timelineTitle}>★ OUR JOURNEY</h2>
      <div className={classes.timeline}>
        {timelineData.map((event) => (
          <div key={event.year} style={{ display: "flex", alignItems: "center", marginBottom: "40px" }}>
            {/* Diamond Year Bullet */}
            <div className={classes.timelineBullet}>
  <span>{event.year}</span>
</div>

            {/* Timeline Card */}
            <div className={classes.timelineCard}>
              <h3 className={classes.timelineCardTitle}>{event.title}</h3>
              <div className={classes.timelineCardContent}>
                <p>{event.centers} CENTER</p>
                <p>{event.volunteers} VOLUNTEERS</p>
                <p>{event.children} CHILDREN</p>
              </div>
              <span className={classes.timelineYear}>{event.year}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
      </div>
    </Container>
    </main>
  )
}
