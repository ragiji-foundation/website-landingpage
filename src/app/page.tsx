import React from 'react';

import { CardsCarousel } from '@/components/CardsCarousel';
import { Foundation } from '@/components/Foundation';

import { ArticlesCardsGrid } from '@/components/ArticlesCardsGrid';
import { SuccessStoriesContainer } from '@/components/SuccessStories';

import Gallery from '@/components/Gallery';
import { Initiatives } from '@/components/Initiatives';
import { Testimonials } from '@/components/Testimonials';

function App() {

  return (
    <>
  

      <div className="app-container">
        <CardsCarousel />
        <Foundation />
        <Initiatives />
        <Gallery />
        <ArticlesCardsGrid />
        <Testimonials />
        <SuccessStoriesContainer />
      </div>
    </>
  );
}

export default App;