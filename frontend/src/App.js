import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import ChatPage from './ChatPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const supabase = createClient('https://gyowcxxjadsfkyyjiccv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5b3djeHhqYWRzZmt5eWppY2N2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg0NjkwNDUsImV4cCI6MjAyNDA0NTA0NX0.iTi2bFhjDrncJ_cVzQiEdacY8GZcr5vgHC8f4UcFt-8')

function App () {
  // const history = useHistory();
  // const handleSignIn = () => {
  //   history.push('/chat');
  // };

  return (
    <div style={{display: 'flex',
    position: 'relative',
    alignItems: 'center', 
    justifyContent: 'space-around', 
    height: '100vh', 
    gap: '10px'}}>

      <div style={{flex: '1', 
      border: '2px solid green', 
      borderRadius: '10px', 
      padding: '60px' , 
      maxWidth: '400px', 
      marginLeft: '120px', 
      marginTop: '60px'}}>
        <Auth
          supabaseClient={supabase}
          appearance={{theme: ThemeSupa}}
          theme="light"
          providers={['google', 'github']}
        />
      </div>
      {/* Text */}
      <div style={{ position: 'absolute', 
      marginTop: '160px',
      top: '-1px', 
      left: '330px', 
      marginLeft: '50px', 
      transform: 'translateX(-50%)', 
      border: '2px ', 
      font: 'menu', 
      padding: '0px', 
      textAlign: 'center', 
      fontSize: '15px', 
      color: 'green' }}>
        <h1>Your Private Contract Lawyer</h1>
      </div>

      <div style={{ flex: '1', 
      textAlign: 'center', 
      marginLeft: '100px', 
      paddingLeft: '50px'}}>
        <div style={{ border: '2px', borderRadius: '10px'}}>
          <img src="https://replicate.delivery/pbxt/3XoM2jGkxZbsPpEj5n2AjZf762efFPuEURg11EPVgC84KgxkA/617f3d20-c044-4ff8-9aa8-d6261c6325dd.png" alt="Ze Lawyer" style={{width: '900px', height: '700px', borderRadius:'10px'}} />
        </div>
      </div>
    </div>


  );
}

export default App