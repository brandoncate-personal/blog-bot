const fetch = require('node-fetch');

module.exports = robot => {
    robot.on('issues.opened', async context => {
        const { body } = context.payload.issue;

        // create a comment
        const params = context.issue({
            body: body.includes('Thanks')
                ? 'You are Welcome!'
                : 'Thanks!'
        });
        // publish it
        return context.octokit.issues.createComment(params);
    });

    robot.on('push', async context => {
        const { url: repo } = context.payload.repository;

        const response = await fetch(`https://us-central1-test-1-300600.cloudfunctions.net/my-service-dev-first?repo=${repo}`);
        const data = await response.json();

        // create a comment
        const params = context.issue({
            title: "bot issue",
            body: JSON.stringify(data)
        });
        // publish it test
        return context.octokit.issues.create(params);
    })
}