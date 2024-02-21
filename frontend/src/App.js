import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabase = createClient('https://gyowcxxjadsfkyyjiccv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5b3djeHhqYWRzZmt5eWppY2N2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg0NjkwNDUsImV4cCI6MjAyNDA0NTA0NX0.iTi2bFhjDrncJ_cVzQiEdacY8GZcr5vgHC8f4UcFt-8')

const App = () => (
  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '100vh'}}>
    <div style={{flex: '1', border: '2px solid green', borderRadius: '10px', padding: '60px' , maxWidth: '400px', marginLeft: '120px'}}>
      <Auth
        supabaseClient={supabase}
        appearance={{theme: ThemeSupa}}
        theme="dark"
        providers={['google', 'github']}
      />
    </div>

    <div style={{ flex: '1', textAlign: 'center', marginLeft: '100px', paddingLeft: '50px'}}>
      <div style={{ border: '2px', borderRadius: '10px'}}>
        <img src="https://replicate.delivery/pbxt/rILJONeTC13fOU9aMhoXNC7B37yo2A8pIyuSL7d6kWIqSvYSA/84fb5c2e-d754-4585-b552-67c5870e5b1e.png" alt="Ze Lawyer" style={{width: '900px', height: '700px', borderRadius:'10px'}} />
      </div>
    </div>
  </div>
)

export default App