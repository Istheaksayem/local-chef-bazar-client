import React from 'react';
import Hero from '../../Hero/Hero';
import ExtraSection from '../../ExtraSection/ExtraSection';
import DailyMeals from '../../DailyMeals/DailyMeals';
import CustomerReviews from '../../../Component/CustomerReviews/CustomarReviews';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>  <title>Home | Local chef Bazar</title></Helmet>
            <Hero></Hero>
            <DailyMeals></DailyMeals>
            <CustomerReviews></CustomerReviews>
            <ExtraSection></ExtraSection>
        </div>
    );
};

export default Home;