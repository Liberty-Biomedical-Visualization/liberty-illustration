module.exports = async ({ github, context }) => {
  const deployments = await github.rest.repos.listDeployments({
    environment: process.env.ENVIRONMENT,
    owner: context.repo.owner,
    repo: context.repo.repo,
  });

  const lastSuccessfulDeployment = deployments.data
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .find((deployment) => deployment.state === "success");

  if (lastSuccessfulDeployment) {
    return lastSuccessfulDeployment.sha;
  }

  throw new Error("successful deployment not found");
};
