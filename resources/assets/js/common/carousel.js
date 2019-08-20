import React from 'react'
import PropTypes from 'prop-types'
import AliceCarousel from 'react-alice-carousel'
import { Icon } from 'semantic-ui-react'
import 'react-alice-carousel/lib/alice-carousel.css'
import {isMobileOnly, isTablet} from 'react-device-detect'

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            galleryItems: this.props.items.map((i) => (
                <div key={i} className='review-item'>
                    <div className='review-avatar'>
                        <img src={i.avatar} />
                        <div className='icon-quote-right'>
                            <Icon name='quote right'/>
                        </div>
                    </div>
                    <div className='review-text-section'>
                        <p className="name">{i.name}</p>
                        <h3>{i.description}</h3>
                        <hr/>
                        <p>{i.job}</p>
                    </div>
                </div>)
            ),
            newsItems: this.props.items.map((i) => (
                <div key={i} className='news-item'>
                    <div className='figure'>
                        <img src={`${ i.url}`} />
                    </div>
                    <div className='news-content'>
                        <h3>{i.title}</h3>
                        <p className='normal'>{i.description}</p>
                        <p className='category'>By {i.author} in {i.type}</p>
                        <p className='normal'>{i.time} <span>&middot;</span> {i.read} read <span className='news-icon-arrow'><Icon name='arrow right'/></span></p>
                    </div>
                </div>)
            ),
            responsive_mobile: {
                0: { items: 1 }
            },
            responsive_tablet: {
                0: { items: 2 }
            },
            responsive_browser: {
                0: { items: 3 }
            },
            currentIndex: 0
        }
    }
      
    slideNext  () {
        this.setState({ currentIndex: this.state.currentIndex + 1 })
    } 
 
    slidePrev  () {
        this.setState({ currentIndex: this.state.currentIndex - 1 })
    }

    render() {
        const { galleryItems, newsItems, responsive_mobile, responsive_browser, responsive_tablet, currentIndex } = this.state
        return (
            <div style={{position: 'relative'}}>
                <AliceCarousel
                    items={this.props.type=='news'?newsItems:galleryItems}
                    responsive={isMobileOnly?responsive_mobile:isTablet?responsive_tablet:responsive_browser}
                    autoPlayInterval={2000}
                    autoPlayDirection='rtl'
                    autoPlay={false}
                    fadeOutAnimation={true}
                    mouseDragEnabled={true}
                    playButtonEnabled={false}
                    disableAutoPlayOnAction={true}
                    slideToIndex={currentIndex}
                />
                <button className='alice-carousel_prev_btn' onClick={() => this.slidePrev()}><Icon name='arrow left'/></button>
                <button className='alice-carousel_next_btn' onClick={() => this.slideNext()}><Icon name='arrow right'/></button>
            </div>
        )
    }
}
Gallery.propTypes = {
    items: PropTypes.array.isRequired,
    type: PropTypes.string
};
export default Gallery;