import React from 'react';
import Hero from '../../Hero/Hero';
import ExtraSection from '../../ExtraSection/ExtraSection';
import DailyMeals from '../../DailyMeals/DailyMeals';
import CustomerReviews from '../../../Component/CustomerReviews/CustomarReviews';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <DailyMeals></DailyMeals>
            <CustomerReviews></CustomerReviews>
            <ExtraSection></ExtraSection>
        </div>
    );
};

export default Home;