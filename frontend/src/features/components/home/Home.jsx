// @ts-nocheck
import React, { useState, useEffect } from 'react';
import GalleryTestimonials from '../../toolbox/gallery/GalleryTestimonials';
import RoundedButton from '../../toolbox/buttons/RoundedButton';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllIndustries } from '../industry/industriesSlice';
import { selectAllTestimonials } from './../testimonials/testimonialsSlice';
import styles from './home.module.css';

// !----------------------------------------------------------
import career from './assets/img/career.jpg';
import netflix from './assets/img/article-netflix.png';
import startup from './assets/img/article-startup.png';
import help from './assets/img/help.png';
import Team from '../team/Team';

const Home = ({ homeProps }) => {
  const navigate = useNavigate();
  const industries = useSelector(selectAllIndustries);
  const [display, setDisplay] = useState(false);

  const testimonialsData = useSelector(selectAllTestimonials).map((testimonial) => {
    return testimonial.img;
  });

  const handleNavigation = (paramsPath) => {
    navigate(paramsPath);
  };

  const handleNavigateArticle = () => {
    navigate('/ideas');
  };

  const handleTestimonials = () => {
    navigate('/about/testimonials');
  };

  const buttonStyle = {
    border: 'none!important'
  };

  const handleScroll = () => {
    if (document.body.scrollTop > 140 || document.documentElement.scrollTop > 140) {
      homeProps.visibleChatMethod(true);
    } else {
      homeProps.visibleChatMethod(false);
    }
  };

  const renderedIndustries = industries.map((industry, index) => {
    return <div className="business-item">{industry.name}</div>;
  });

  window.addEventListener('scroll', handleScroll);

  return (
    <main className={`mb-top-padding ${styles.main_padding} text-white `}>
      {/* <ParticlesBg type="cobweb" color="#3A6351" bg={true} num={800} /> */}
      <div
        style={{
          position: 'relative',
          zIndex: '50'
        }}
      >
        <div className="help-section">
          <div className="help-left">
            <h2>
              Siz?? nec?? k??m??k <br /> ed?? bil??rik?
            </h2>
            <p>Sizin biznes istiqam??tiniz?</p>
            <div className="businesses">{renderedIndustries}</div>
          </div>

          <div className="help-right">
            <img src={help} alt="" />
          </div>
        </div>
        <div className="team-container">
          <Team />
        </div>

        <div className={`${styles.doing_business} text-white `}>
          <div className={`${styles.doing_business_box} text-white `}>
            <p>Doing Business in Azerbaijan</p>

            <div
              className="d-flex align-center justify-end"
              onClick={() => handleNavigation('/services/businessazerbaijan')}
            >
              <RoundedButton className={`${styles.doing_business_button} text-white `} cssStyle={buttonStyle} />
              <span
                style={{
                  marginLeft: '9px',
                  color: '#01AB8D',
                  fontSize: '16px',
                  fontWeight: '400',
                  lineHeight: '24px'
                }}
              >
                Daha ??ox
              </span>
            </div>
          </div>
        </div>

        <div className="articles-updated">
          <h2>M??qal??l??r</h2>
          <div className="articles-content-container d-flex">
            <div className="articles-content-container-left">
              <div
                style={{
                  width: '564px'
                }}
              >
                <img src={netflix} width="564" height="377" alt="thinkwise articles" />
                <h3>NETFLIX | M??QAL??</h3>
                <p>Netflix biznes modelini nec?? d??yi??di...</p>
                <p>
                  1997-ci ild?? bir DVD kiray?? ma??aza kimi i???? ba??layan Netflix, 2020-ci ilin sonundan etibar??n, 190-dan
                  ??ox ??lk??d?? f??aliyy??t g??st??r??rk??n 204 milyon istifad????isi v?? 25 milyard AB?? dollar?? g??liri olan ??n
                  b??y??k subscription-??sasl?? kontent izl??m?? oyun??usudur.
                </p>
              </div>
            </div>
            <div className="articles-content-container-right">
              <div
                style={{
                  width: '564px'
                }}
              >
                <img src={startup} width="564" height="377" alt="thinkwise articles" />
                <h3>STARTAP | M??QAL??</h3>
                <p>Az??rbaycan??n startap ekosisteminin ????tinliyi hans??lard??r?</p>
                <p>
                  TWC-d?? biz inan??r??q ki, startap yaratmaq ??n ????tin, ancaq qurucular??n karyeralar??nda ??zl??rind??n daha
                  b??y??k bir ??ey yarada bil??c??kl??ri ??n vacib t??????bb??sd??r.
                </p>
              </div>
            </div>
          </div>
          <button className="team-button" onClick={handleNavigateArticle}>Ham??s??na bax</button>
        </div>

        <div className={`${styles.carier}`}>
          <img src={career} alt="Home content description testimonials" />
          <div className={`${styles.carier_side2}`}>
            <h3
              style={{
                color: '#171717'
              }}
            >
              Karyeran??za biziml?? ba??lay??n
            </h3>
            <p
              className="mb-text-justify mt-15"
              style={{
                color: '#878787'
              }}
            >
              TWC-d?? m??qs??dimizin yegan?? s??tunu bizim{' '}
              <span
                className={`${styles.line_home_divider}`}
                style={{
                  color: '#878787'
                }}
              ></span>
              insanlar??m??zd??r. Bizim dinamik m??hitd?? siz komanda{' '}
              <span
                className={`${styles.line_home_divider}`}
                style={{
                  color: '#878787'
                }}
              ></span>
              t??r??find??n ilk g??nd??n d??st??k g??rm??yiniz?? baxmayaraq,
              <span
                className={`${styles.line_home_divider}`}
                style={{
                  color: '#878787'
                }}
              ></span>
              siz ??z yolunuzu m????yy??n ed??c??ksiniz.
            </p>
            <div onClick={() => handleNavigation('/career')} className="d-flex align-items-center" style={{
              cursor: 'pointer'
            }}>
              <RoundedButton
                className={`${styles.doing_business_button} text-dark `}
                cssStyle={buttonStyle}
                color="#000"
              />
              <span
                style={{
                  marginLeft: '9px',
                  color: '#01AB8D',
                  fontSize: '16px',
                  fontWeight: '400',
                  lineHeight: '24px'
                }}
              >
                Daha ??ox
              </span>
            </div>
          </div>
        </div>

        <div className={`${styles.client_projects}`}>
          <p className="text-dark">PORTFOL??O</p>
          <h2 className="">M????t??ri layih??l??rimiz</h2>

          <div className="galler-container">
            <GalleryTestimonials
              testimonialsData={testimonialsData}
              localeClassData={`${styles.span_img_container} text-white `}
            />
            <div className={`${styles.slide_dot} text-white `}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <button className="team-button" onClick={handleTestimonials}>
            Ham??s??na bax
          </button>
        </div>
        <div className="contact-us-section  d-flex">
          <h2
            style={{
              maxWidth: '636px'
            }}
          >
            Biz siz?? biznesinizin inki??af??nda k??m??k etm??k v?? suallar??n??z?? cavabland??rmaq ??????n buraday??q.
          </h2>
          <div className="form-container-section">
            <div>
              <h3
                style={{
                  maxWidth: '469px'
                }}
              >
                Biziml?? ??laq?? saxlay??n v?? ya ofisimiz?? yax??nla????n
              </h3>
              <input type="text" name="text" placeholder="email" required />

              <button>??laq??</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
