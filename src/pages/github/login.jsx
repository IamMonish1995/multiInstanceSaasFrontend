import React from "react";

const GitHubLogin = () => {
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/github/callback`;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo read:packages`;

    window.location.href = githubAuthUrl;
  };
  return (
    <div>
      <h1>Welcome to GitHub Repo Fetcher</h1>
      <button onClick={handleLogin}>Login with GitHub</button>
    </div>
  );
};

export default GitHubLogin;
