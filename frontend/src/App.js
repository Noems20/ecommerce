import { useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
// import { AnimatePresence } from 'framer-motion';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { checkLogged } from './redux/user/userActions';

// PAGES
import Home from './pages/home/home.page';
import Cart from './pages/cart/cart.page';
import Login from './pages/login/login.page';
import Profile from './pages/profile/profile.page';
import Register from './pages/register/register.page';
import Shipping from './pages/shipping/shipping.page';
import GiftsPage from './pages/gifts/gifts.page';
import ProductPage from './pages/product/product.page';
import diariesPage from './pages/diaries/diaries.page';
import ClothingPage from './pages/clothing/clothing.page';
import LocalOrdersPage from './pages/local-orders/local-orders.page';
import EditLocalOrderPage from './pages/edit-local-order/edit-local-order.page';
import VerifyAccount from './pages/verify-account/verify-account.page';
import SearchPage from './pages/search/search.page';

// COMPONENTS
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import FullScreenLoader from './components/loaders/full-screen-loader/full-screen-loader.component';
import ChangePassword from './pages/change-password/change-password.page';
import ScrollToTop from './utils/scroll-to-top/scroll-to-top';
import BackToTop from './utils/scroll-to-top/back-to-top.component';

const App = () => {
  // const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const { user, userLoaded } = userData;

  useEffect(() => {
    dispatch(checkLogged());
  }, [dispatch]);

  useEffect(() => {
    const unlisten = history.listen(() => {
      dispatch(checkLogged());
    });
    return function cleanup() {
      unlisten();
    };
  }, [dispatch, history]);

  return (
    <>
      <Header />
      <ScrollToTop />
      <BackToTop />
      {userLoaded.general ? (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search/:keyword" component={SearchPage} />
          <Route exact path="/carrito" component={Cart} />
          <Route path="/agendas" component={diariesPage} />
          <Route path="/regalos" component={GiftsPage} />
          <Route exact path="/producto/:slug" component={ProductPage} />
          <Route exact path="/ropa/:for/:category" component={ClothingPage} />
          <Route
            exact
            path="/ordenes-locales/editar/:id"
            component={EditLocalOrderPage}
          />
          <Route
            exact
            path="/login"
            component={Login}
            // render={() => (user ? <Redirect to='/perfil' /> : <Login />)}
          />
          <Route
            exact
            path="/registro"
            render={() => (user ? <Redirect to="/" /> : <Register />)}
          />
          <Route
            exact
            path="/perfil"
            render={() => (user ? <Profile /> : <Redirect to="/login" />)}
          />
          <Route
            exact
            path="/ordenes-locales"
            render={() =>
              user && user.role === 'admin' ? (
                <LocalOrdersPage />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/envio"
            render={() => (user ? <Shipping /> : <Redirect to="/login" />)}
          />
          <Route
            exact
            path="/verificar-cuenta/:token"
            render={() =>
              user ? <Redirect to="/perfil" /> : <VerifyAccount />
            }
          />
          <Route
            exact
            path="/restablecer-contraseña/:token"
            render={() =>
              user ? <Redirect to="/perfil" /> : <ChangePassword />
            }
          />
        </Switch>
      ) : (
        <FullScreenLoader />
      )}
      <Footer />
    </>
  );
};

export default App;
