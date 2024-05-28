import React, { useContext, useEffect, useState } from 'react';
import { msalInstance } from './msalConfig';
import { config } from '../../Config';
import { UserContext } from './UserContext';
import {
  useNavigate,
  useLocation
} from "react-router-dom";

const Home: React.FC = () => {
  const { setUser, setIsAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();
  const [isInteractionInProgress, setIsInteractionInProgress] = useState(false);
  
  const checkAndClearActiveInteraction = async () => {
    const activeAccount = msalInstance.getActiveAccount();
    if (activeAccount) {
      // Clear active account by logging out
      await msalInstance.logoutPopup({
        account: activeAccount,
        postLogoutRedirectUri: config.redirectUrl.toString()
      });
    }
    setIsInteractionInProgress(false);
  };

  useEffect(() => {
    const initialize = async () => {
      await checkAndClearActiveInteraction();
    };
    initialize();
  }, []);
  
  const login = async () => {
    msalInstance.clearCache();

    try {
      await msalInstance.initialize();
      msalInstance.handleRedirectPromise()
      .then((tokenResponse) => {
        if (!tokenResponse) {
            const accounts = msalInstance.getAllAccounts();
            if (accounts.length === 0) {
                msalInstance.loginRedirect();
            }
        } else {
            // Do something with the tokenResponse
        }
      })
      .catch((err) => {
        // Handle error
        console.error(err);
      });
      const response = await msalInstance.loginPopup({
        scopes: config.scopes,
        prompt: 'select_account',
      });

      const token = await msalInstance.acquireTokenPopup({
        scopes: config.scopes,
        prompt: 'select_account',
      })

      setUser(response.account);
      setIsAuthenticated(true);
      navigate('/boards');
    } catch (err) {
      console.error('Login failed', err);
    } finally {
      await msalInstance.handleRedirectPromise().catch(() => {
        setIsInteractionInProgress(false);
      });
    }
  };

  useEffect(() => {
    const initializeMsal = async () => {
      try {
        await msalInstance.handleRedirectPromise().catch(() => {
          setIsInteractionInProgress(false);
        });
        await msalInstance.initialize(); 
      } catch (error) {
        console.error('MSAL initialization failed', error);
      }
    };

    initializeMsal();
  }, []);

  return (
    <div className='login'>
      <div className='wrapper-form'>
        <h3 className='login-title'>FluidBoard</h3>
        <button onClick={login} disabled={isInteractionInProgress}>
          {isInteractionInProgress ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
};
export default Home;