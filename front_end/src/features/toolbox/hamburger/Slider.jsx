// @ts-nocheck
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {nanoid} from '@reduxjs/toolkit';
import {Link, useNavigate} from 'react-router-dom';
import styled, {keyframes} from 'styled-components';
import sliderTwc from './../../components/common/assets/svg/navigation-slider.svg';
import {selectAllServices} from './../../components/services/servicesSlice';
import {selectAllLinks} from './../../navigation/navigationSlice';
import GalleryServices from './../gallery/GalleryServices';
import icon from './assets/img/menu-x-icon.svg';
import styles from './hamburger.module.css';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};


const Slider = ({classData, handleSliderClick, conditionView}) => {
    const lenganimation = keyframes`


      0% {
        width: 1%;
        opacity: 0;
      }
      16% {
        width: 100%;
        float: left;
        opacity: 0.33;
      }

      32% {
        width: 100%;
        float: right;
        opacity: 0.66;
      }

      48% {
        float: right;
        width: 1%;
        opacity: 0.99;
      }

      64% {
        width: 100%;
        float: right;
        opacity: 0.66;
      }

      80% {
        width: 100%;
        float: left;
        opacity: 0.33;
      }

      100% {
        width: 1%;
        opacity: 0;
      }

    `;

    const [secretkey, setSecretKey] = useState(nanoid());
    const navigate = useNavigate();

    const AnimatedBox = styled.div`
      width: 1%;
      height: 1px;
      background-color: #fff;
      opacity: 0;
      margin-top: 5px;
      animation-name: ${lenganimation};
      animation-delay: ${(props) => props.index * 4}s;
      animation-duration: 4s;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
      float: left;
    `;

    // !services from service slice
    const allServices = useSelector(selectAllServices);

    // !menu links from navigation slice
    const allLinks = useSelector(selectAllLinks);

    const [toggle, setToggle] = useState(false);
    const [idData, setIdData] = useState('');

    // !clicked navigation item

    const [view, setView] = useState('');
    const [hidden, setHidden] = useState('');
    const [error, setError] = useState('');

    // !modal states and functions
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        localStorage.setItem('crm_login', secretkey);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const [userPassword, setUserPassword] = useState('');


    const handleCrmLoginPage = () => {
        if (userPassword === secretkey) {
            navigate('/login');
        } else {
            setError('Incorrect access code');
            setTimeout(() => setError(''), 3000);
        }
    };

    const handleSubmenuRouting = (paramsUrl) => {
        setToggle(!toggle);
        navigate(paramsUrl);
    };

    const setMainMenu = (item) => {
        return (
            <li
                key={item.id}
                onClick={() => {
                    setToggle((previousValue) => {
                        return previousValue ? false : true;
                    });
                    setIdData(item.id);
                }}
                className={` mb-mb-20 display_none display-mb-block`}
                style={
                    item.id === idData && toggle
                        ? {
                            display: 'block'
                        }
                        : item.id !== idData && toggle
                            ? {display: 'none'}
                            : {
                                display: 'block'
                            }
                }
            >
                <Link
                    to={item.link}
                    className={`${styles.animate_character} ${styles.link}`}
                    style={{
                        fontSize: '35px'
                    }}
                >
                    {item.name}
                </Link>
                {item.hasSubmenu && (
                    <div className={styles.submenu}>
                        <ul
                            style={{
                                background: 'rgba(255,255,255,.1)',
                                marginTop: '20px',
                                width: '90%',
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}
                        >
                            {toggle &&
                                allLinks
                                    .find((item) => item.id === idData)
                                    .subMenus.map((item, index) => {
                                    return (
                                        <li
                                            onClick={() => {
                                                setToggle(!toggle);
                                                navigate(`${item.link}`);
                                            }}
                                            className={styles.sublist_item}
                                        >
                                            <div className={`${styles.display_inline_animation_view}`}>
                          <span
                              onClick={() => handleSubmenuRouting(item.link)}
                              className={styles.sublink_item}
                              to={item.link}
                          >
                            {item.name}
                          </span>

                                                <AnimatedBox index={`${index}`}></AnimatedBox>
                                            </div>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                )}
            </li>
        );
    };

    const mainMenu = allLinks.map((item) => {
        return setMainMenu(item);
    });

    return (
        <div
            className={`slider slider-mb display-mb-flex ${conditionView ? conditionView : classData}`}
            style={{overflowY: 'hidden', position: 'fixed!important', top: '0'}}
        >
            <img
                src={icon}
                alt="slider-menu icon"
                className={`qodef-valiance-svg-close ${styles.right}`}
                onClick={handleSliderClick}
            />
            <img
                src={sliderTwc}
                alt="think wise company slider navigation svg logo"
                width="1200px"
                style={{
                    transform: 'rotate(90deg)',
                    position: 'absolute',
                    left: '-275px',
                    top: '150px'
                }}
            />

            <ul className={`${styles.menu_centerer} display_none flex-mb-column display-mb-block`}>
                {mainMenu}
                <li onClick={handleCrmLoginPage}>
          <span
              className={`${styles.animate_character} ${styles.link}`}
              onClick={handleOpen}
              style={{
                  fontSize: '35px'
              }}
          >
            TWC CRM-ə daxil ol!
          </span>
                </li>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            TWC CRM-ə daxil ol!
                        </Typography>
                        <br/>
                        <Input
                            placeholder={error && error.length > 0 ? error : 'icazə kodunuz buraya...'}
                            className="mb-3"
                            aria-labelledby="password"
                            name="password"
                            id="password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                        <br/>

                        <Fab variant="extended" onClick={handleCrmLoginPage}>
                            <NavigationIcon size="medium"/>
                            Navigate
                        </Fab>
                    </Box>
                </Modal>

            </ul>
            <p className={`mobile-display-none text-upper text-white ${styles.slider_paragraph}`}>
                BİZNESİNİZİ TWC İLƏ YÜKSƏLDİN
            </p>
            <h2 className={`mobile-display-none ${styles.header_text}`}>Think Wise Consulting</h2>
            <p className={`mobile-display-none ${styles.twc_difference}`}>
                Peşəkar komandamızla TWC sizə uğurlu biznesinizi qurmağa <br/> və inkişaf etdirməyə imkan verir.
            </p>
            <h2 className={`${styles.header_text} ${styles.animate_character} mobile-display-none`}>
                Konsalting servislərimiz
            </h2>
            <GalleryServices
                data={allServices}
                className="alice-without-image"
                boxContainerClass={`${styles.service_logo_group} mobile-display-none d-flex  justify-between`}
                boxClass={`${styles.service_logo_box} d-flex direction-column align-center justify-center `}
                imgClass={`${styles.service_logo}`}
                spanClass={`${styles.service_logo_sub_title}`}
                isWhite={true}
                buttonSize="32px"
            />
        </div>
    );
};

export default Slider;
