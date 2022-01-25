import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { updateMe, setUpdatedUser } from '../../redux/user/userActions';

// COMPONENTS
import ProfileTab from '../../components/profile-tabs/profile/profile-tab.component';
import ShippingTab from '../../components/profile-tabs/shipping/shipping-tab.component.';
import OrdersTab from '../../components/profile-tabs/orders/orders-tab.component';

// STYLES
import {
  UserDetailsContainer,
  UserDetails,
  UserImageContainer,
  UserImage,
  ImageInput,
  ImageInputLabel,
  UserInfo,
  UserName,
  Info,
  Settings,
  SettingsBar,
  CollapseItem,
  SettingItem,
} from './profile.page.styles';
import { PageGrid } from '../../general.styles';

// ICONS
import { FaEnvelope, FaPhoneAlt, FaCaretDown } from 'react-icons/fa';
import { BsCamera } from 'react-icons/bs';

const Profile = () => {
  // ------------------------------- STATE AND CONSTANTS ----------------
  const [imageHash, setImageHash] = useState(Date.now());
  const [tab, setTab] = useState(sessionStorage.getItem('tab') || 'Perfil');
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');

  const { user, userLoaded } = useSelector((state) => state.user);
  const { uiErrors } = useSelector((state) => state.ui);
  const userImageSrc = `https://copiasnoe-ecommerce.s3.amazonaws.com/users/${user.photo}`;

  const dispatch = useDispatch();
  const location = useLocation();

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  const barVariants = {
    hidden: {
      height: 0,
      transition: {
        ease: 'easeInOut',
      },
    },
    visible: {
      height: 'auto',
      transition: {
        ease: 'easeInOut',
      },
    },
  };

  const barVariants2 = {
    hidden: {
      height: 'auto',
    },
    visible: {
      height: 'auto',
    },
  };
  const urlTab = location.search.split('tab=')[1];

  // --------------------------------- USE EFFECT ------------------

  useEffect(() => {
    if (!sessionStorage.getItem('tab') && urlTab === 'ordenes-activas') {
      sessionStorage.setItem('tab', 'Pedidos en curso');
      setTab('Pedidos en curso');
    }
  }, [urlTab]);

  useEffect(() => {
    // ---------- UPDATE USER PHOTO ---------
    if (userLoaded.updatedUser === true) {
      setImageHash(Date.now());
      dispatch(setUpdatedUser(false));
    }
  }, [dispatch, userLoaded]);

  useEffect(() => {
    if (window.innerWidth > 500) {
      setOpen(true);
    } else {
      setOpen(false);
    }

    function handleResize() {
      if (window.innerWidth > 500) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      sessionStorage.removeItem('tab');
    };
  }, []);

  // --------------------------------- HANDLERS ---------------------
  const renderSwitch = () => {
    switch (tab) {
      case 'Perfil':
        return <ProfileTab variants={containerVariants} key={1} />;
      case 'Pedidos en curso':
        return (
          <OrdersTab variants={containerVariants} status={'active'} key={2} />
        );
      case 'Historial de pedidos':
        return (
          <OrdersTab variants={containerVariants} status={'unactive'} key={3} />
        );
      case 'Envio':
        return <ShippingTab variants={containerVariants} key={4} />;
      default:
        return <ProfileTab variants={containerVariants} key={1} />;
    }
  };

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
    dispatch(updateMe(user.name, e.target.files[0]));
  };

  const tabHandler = (tab) => {
    setTab(tab);
    sessionStorage.setItem('tab', tab);
  };

  return (
    <PageGrid
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* -------------------------------- HEADER ---------------------- */}
      <UserDetailsContainer>
        <UserDetails>
          <UserImageContainer>
            <UserImage url={`${userImageSrc}?${imageHash}`} />
            <ImageInputLabel
              htmlFor="photo"
              error={uiErrors.errorsOne.photo ? true : false}
              className={
                selectedFile ? !uiErrors.errorsOne.photo && 'selected' : ''
              }
            >
              <BsCamera />
            </ImageInputLabel>
            <ImageInput
              type="file"
              accept="image/*"
              // name='photo'
              id="photo"
              onChange={handleImageChange}
              // onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </UserImageContainer>
          <UserInfo>
            <UserName>{user.name}</UserName>
            <Info>
              <FaEnvelope />
              {user.email}
            </Info>
            <Info>
              <FaPhoneAlt />
              (492) 134 7258
            </Info>
          </UserInfo>
        </UserDetails>
      </UserDetailsContainer>
      {/* -------------------------------- SETTINGS BAR ---------------------- */}
      <Settings>
        <CollapseItem onClick={() => setOpen(!open)}>
          {tab} <FaCaretDown />
        </CollapseItem>
        <AnimatePresence>
          {open && (
            <SettingsBar
              variants={window.innerWidth <= 500 ? barVariants : barVariants2}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <SettingItem
                onClick={() => tabHandler('Perfil')}
                className={tab === 'Perfil' ? 'active' : ''}
              >
                Perfil
              </SettingItem>
              <SettingItem
                onClick={() => tabHandler('Pedidos en curso')}
                className={tab === 'Pedidos en curso' ? 'active' : ''}
              >
                Pedidos en curso
              </SettingItem>
              <SettingItem
                onClick={() => tabHandler('Historial de pedidos')}
                className={tab === 'Historial de pedidos' ? 'active' : ''}
              >
                Historial de pedidos
              </SettingItem>
              <SettingItem
                onClick={() => tabHandler('Envio')}
                className={tab === 'Envio' ? 'active' : ''}
              >
                Envio
              </SettingItem>
            </SettingsBar>
          )}
        </AnimatePresence>
      </Settings>
      {/* -------------------------------- TAB CONTENT ---------------------- */}

      <AnimatePresence exitBeforeEnter>{renderSwitch()}</AnimatePresence>
    </PageGrid>
  );
};

export default Profile;
