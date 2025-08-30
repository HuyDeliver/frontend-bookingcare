import { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader'
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import FeaturedDoctor from './Section/FeaturedDoctor';
import HanBook from './Section/HanBook';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import './HomePage.scss'
class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2,
        };
        return (
            <>
                <HomeHeader isShowbanner={true} />
                <Specialty
                    settings={settings}
                />
                <MedicalFacility
                    settings={settings}
                />
                <FeaturedDoctor
                    settings={settings}
                />
                <HanBook />
                <About />
                <HomeFooter />
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
