const Firestore = require('@google-cloud/firestore');

const fetch = require('node-fetch');

// Use your project ID here
const PROJECTID = 'test-1-300600';
const COLLECTION_NAME = 'pages';

const firestore = new Firestore({
    projectId: PROJECTID,
    timestampsInSnapshots: true
});

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
        console.log('starting push execution')

        const { url: repo } = context.payload.repository;

        const response = await fetch(`https://us-central1-test-1-300600.cloudfunctions.net/my-service-dev-first?repo=${repo}`);
        const data = await response.json();

        console.log(data)

        const pagesRef = firestore.collection(COLLECTION_NAME)

        data.data.map(async content => {
            const page = {
                branch: data.branch,
                repo: data.repo,
                ...content,
            }

            const doc = await pagesRef.doc(`${page.repo}/${page.branch}/${page.path}`).set(page)

            console.log(doc)
        })

        return
    })
}