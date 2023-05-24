const Login = () => {
  return (
    <main>
      <main className="m-4 flex flex-col gap-4">
        <div className="flex">
          <Logo />
          <Link to="/signup">View showcase</Link>
          <Link to="/login">Login or sign up</Link>
        </div>
        <h1 className="text-3xl">Create 3D scenes with ease</h1>
        <h1 className="text-3xl">Save scenes</h1>
        <Link to="/scene">Start creating</Link>
        <Link to="/scene">View showcase</Link>
        <Link to="/login">Login or sign up</Link>
      </main>
    </main>
  );
};

export default Login;
