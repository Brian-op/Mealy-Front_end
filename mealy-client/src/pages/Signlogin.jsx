import "./Signlogin.css"

function Signlogin() {
  return (
    <main className="main">

        <div className="logo-img">
           <h1>MEA<i class="fa-solid fa-utensils"></i>Y</h1>
        </div>

        <h1 className="msg">Welcome to Meally!</h1>

        <div className="container">
        
        <div className="hero-buttons">
        <a href="/signup" className="button-primary">Sign Up</a>
        <a href="/login" className="button-secondary">Login</a>
        </div>

        </div>
    </main>
   
  );
}

export default Signlogin;