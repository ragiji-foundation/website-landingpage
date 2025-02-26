"use client"

import { useState, useRef, useEffect } from "react"
import { Container, Title, Text, Group, ActionIcon, Card, Box } from "@mantine/core"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import styles from './success-stories-section.module.css'

interface VibeImage {
  src: string;
  alt: string;
  url: string;
  title: string;
}

export default function SuccessStoriesSection() {
  const router = useRouter()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const images: VibeImage[] = [
    {
      src: "https://picsum.photos/seed/picsum/200/300",
      alt: "Colorful portrait mural",
      url: "/success-stories/colorful-portrait",
      title: "Colorful Portrait"
    },
    {
      src: "https://picsum.photos/seed/picsum/200/300",
      alt: "Abstract street art",
      url: "/success-stories/abstract-street",
      title: "Abstract Street"
    },
    {
      src: "https://picsum.photos/seed/picsum/200/300",
      alt: "Portrait mural",
      url: "/success-stories/portrait-mural",
      title: "Portrait Mural"
    },
    {
      src: "https://picsum.photos/seed/picsum/200/300",
      alt: "Nature artwork",
      url: "/vibes/nature-art",
      title: "Nature Art"
    },
    {
      src: "https://picsum.photos/seed/picsum/200/300",
      alt: "Faces collage bombay",
      url: "/success-stories/faces-bombay",
      title: "Faces of Bombay"
    },
    {
      src: "https://picsum.photos/seed/picsum/200/300",
      alt: "Faces collage by Handx Opr",
      url: "/success-stories/handx-opr",
      title: "Handx Opr Collection"
    },
    {
      src: "https://picsum.photos/seed/picsum/200/300",
      alt: "Faces collage nwq",
      url: "/success-stories/nwq-collection",
      title: "NWQ Collection"
    },
    {
      src: "https://picsum.photos/seed/picsum/200/300",
      alt: "Faces collage zte",
      url: "/success-stories/zte-series",
      title: "ZTE Series"
    },
  ]

  // Check scroll possibilities
  const checkScroll = () => {
    if (!scrollContainerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScroll)
      checkScroll()
    }
    return () => container?.removeEventListener('scroll', checkScroll)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const scrollAmount = container.clientWidth * 0.8
    const newPosition = direction === "left"
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    })
  }

  const handleCardClick = (url: string) => {
    router.push(url)
  }

  return (
    <Container size="xl" py="xl">
      <Group justify="space-between" align="flex-start" mb="xl">
        <div>
          <Title order={2} size="h1" mb="md">
            Success Stories
          </Title>
            <Text c="dimmed" maw={600}>
            Discover the inspiring success stories of our community members who have achieved remarkable milestones.
            </Text>
        </div>
        <Group>
          <ActionIcon
            variant="light"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={styles.scrollButton}
            aria-label="Scroll left"
          >
            <IconChevronLeft />
          </ActionIcon>
          <ActionIcon
            variant="light"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={styles.scrollButton}
            aria-label="Scroll right"
          >
            <IconChevronRight />
          </ActionIcon>
        </Group>
      </Group>

      <Box
        ref={scrollContainerRef}
        className={styles.scrollContainer}
      >
        {[...images, ...images].map((image, index) => (
          <Card
            key={index}
            padding="0"
            className={styles.card}
            onClick={() => handleCardClick(image.url)}
          >
            <Card.Section className={styles.imageContainer}>
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className={styles.image}
              />
              <div className={styles.overlay}>
                <Text size="lg" fw={500} c="white">
                  View Details
                </Text>
              </div>
            </Card.Section>
            <Text size="lg" fw={500} p="md">
              {image.title}
            </Text>
          </Card>
        ))}
      </Box>
    </Container>
  )
}

