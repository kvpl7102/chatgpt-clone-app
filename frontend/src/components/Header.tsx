import { AppBar, Toolbar } from '@mui/material';
import Logo from './shared/Logo';
import NavLink from './shared/NavLink';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const auth = useAuth();
  
  
  
  return (
    <AppBar 
    sx={{
      bgcolor: "transparent", 
      position: "static", 
      boxShadow: "none"}}>
      <Toolbar 
      sx={{
        display: "flex"
        }}>
          <Logo />
          <div>
            {auth?.isLoggedIn ? (
              <>
                <NavLink 
                  bg="#00fffc"
                  textColor='black'
                  to="/chat"
                  text="Go to chat"                  
                  />

                <NavLink 
                  bg="#51538f"
                  textColor='white'
                  to='/'
                  text="Log out"
                  onClick={auth.logout}
                  />
              </>
            ) : (
              <>
                <NavLink 
                  bg="#00fffc"
                  textColor='black'
                  to="/login"
                  text="Log in"                  
                  />

                <NavLink 
                  bg="#51538f"
                  textColor='white'
                  to='/signup'
                  text="Sign up"
                  />
              </>
            )}
          </div>
        </Toolbar>
    </AppBar>
    
    
  );
}

export default Header
