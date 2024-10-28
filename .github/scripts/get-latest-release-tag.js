module.exports = async ({ github, context }) => {
  const { owner, repo } = context.repo;
  const response = await github.rest.repos.getLatestRelease({ owner, repo });
  return response.data.tag_name;
};
