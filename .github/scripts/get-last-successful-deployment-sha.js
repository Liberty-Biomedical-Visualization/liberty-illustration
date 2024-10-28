module.exports = async ({ github, context }) => {
  const { owner, repo } = context.repo;

  const deployments = await github.rest.repos.listDeployments({
    environment: process.env.ENVIRONMENT,
    owner,
    repo,
  });

  const sortedDeployments = deployments.data.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  for (const deployment of sortedDeployments) {
    const statuses = await github.rest.repos.listDeploymentStatuses({
      deployment_id: deployment.id,
      owner,
      repo,
    });

    const deploymentSucceeded = statuses.data.some(
      (status) => status.state === "success",
    );

    if (deploymentSucceeded) {
      return deployment.sha;
    }
  }

  throw new Error("successful deployment not found");
};
