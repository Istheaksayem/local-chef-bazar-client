import React from 'react';
import Hero from '../../Hero/Hero';
import ExtraSection from '../../ExtraSection/ExtraSection';
import DailyMeals from '../../DailyMeals/DailyMeals';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <DailyMeals></DailyMeals>
            <ExtraSection></ExtraSection>
        </div>
    );
};

export default Home;