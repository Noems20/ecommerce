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
import HeaderMenu, {
  SettingItem,
} from '../../components/header-menu/header-menu.component';

// STYLES
import {
  UserDetails,
  UserImageContainer,
  UserImage,
  ImageInput,
  ImageInputLabel,
  UserInfo,
  UserName,
  Info,
} from './profile.page.styles';

import { PageGrid } from '../../general.styles';

// ICONS
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { BsCamera } from 'react-icons/bs';

const Header = () => {
  const [selectedFile, setSelectedFile] = useState('');
  const [imageHash, setImageHash] = useState(Date.now());

  const dispatch = useDispatch();
  const { user, userLoaded } = useSelector((state) => state.user);
  const { uiErrors } = useSelector((state) => state.ui);
  const userImageSrc = `https://copiasnoe-ecommerce.s3.amazonaws.com/users/${user.photo}`;

  useEffect(() => {
    // ---------- UPDATE USER PHOTO ---------
    if (userLoaded.updatedUser === true) {
      setImageHash(Date.now());
      dispatch(setUpdatedUser(false));
    }
  }, [dispatch, userLoaded]);

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
    dispatch(updateMe(user.name, e.target.files[0]));
  };
  return (
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
  );
};

const Profile = () => {
  // ------------------------------- STATE AND CONSTANTS ----------------
  const [tab, setTab] = useState(sessionStorage.getItem('tab') || 'Perfil');

  const location = useLocation();

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  const urlTab = location.search.split('tab=')[1];

  // --------------------------------- USE EFFECT ------------------

  useEffect(() => {
    if (!sessionStorage.getItem('tab') && urlTab === 'Pedidos en curso') {
      sessionStorage.setItem('tab', 'Pedidos en curso');
      setTab('Pedidos en curso');
    }
  }, [urlTab]);

  // --------------------------------- HANDLERS ---------------------
  const renderSwitch = () => {
    switch (tab) {
      case 'Perfil':
        return <ProfileTab variants={containerVariants} key={1} />;
      case 'Pedidos en curso':
        return (
          <OrdersTab
            variants={containerVariants}
            status={'active'}
            title="Pedidos en curso"
            key={2}
          />
        );
      case 'Historial de pedidos':
        return (
          <OrdersTab
            variants={containerVariants}
            status={'Entregados'}
            title="Historial de pedidos"
            key={3}
          />
        );
      case 'Envio':
        return <ShippingTab variants={containerVariants} key={4} />;
      default:
        return <ProfileTab variants={containerVariants} key={1} />;
    }
  };

  return (
    <PageGrid
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <HeaderMenu Header={<Header />} currentTab={tab}>
        <>
          <SettingItem tab="Perfil" setTab={setTab} currentTab={tab}>
            Perfil
          </SettingItem>
          <SettingItem tab="Pedidos en curso" setTab={setTab} currentTab={tab}>
            Pedidos en curso
          </SettingItem>
          <SettingItem
            tab="Historial de pedidos"
            setTab={setTab}
            currentTab={tab}
          >
            Historial de pedidos
          </SettingItem>
          <SettingItem tab="Envio" setTab={setTab} currentTab={tab}>
            Envio
          </SettingItem>
        </>
      </HeaderMenu>
      {/* -------------------------------- TAB CONTENT ---------------------- */}

      <AnimatePresence exitBeforeEnter>{renderSwitch()}</AnimatePresence>
    </PageGrid>
  );
};

export default Profile;
